import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import checkDiskSpace from "check-disk-space";
import { runCommand } from "./executor.js";
import { redactLines } from "./redaction.js";
import type { PairingRecord, TokenRecord } from "./types.js";

const PAIRING_TTL_SECONDS = 180;
const ACCESS_TOKEN_TTL_SECONDS = 3600;
const isMockRuntime = () => process.env.MOCK_RUNTIME === "1";

const fixturePath = path.resolve(process.cwd(), "packages/agent/fixtures/logs.txt");
const fixtureLogs = fs.readFileSync(fixturePath, "utf-8").trim().split("\n");

const pairingStore = new Map<string, PairingRecord>();
const tokenStore = new Map<string, TokenRecord>();

function createPairingCode(): string {
  const code = crypto.randomInt(100000, 999999).toString();
  return `${code.slice(0, 3)}-${code.slice(3)}`;
}

function issueToken(): TokenRecord {
  const token = crypto.randomUUID();
  const expiresAt = Date.now() + ACCESS_TOKEN_TTL_SECONDS * 1000;
  return { token, expiresAt };
}

function isTokenValid(token?: string | null): boolean {
  if (!token) return false;
  const record = tokenStore.get(token);
  if (!record) return false;
  return record.expiresAt > Date.now();
}

function requestIdMiddleware(): express.RequestHandler {
  return (req, res, next) => {
    const requestId = crypto.randomUUID();
    res.setHeader("X-Request-Id", requestId);
    next();
  };
}

function authMiddleware(): express.RequestHandler {
  return (req, res, next) => {
    const authHeader = req.header("authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!isTokenValid(token)) {
      res.status(401).json({ code: "unauthorized", message: "Unauthorized" });
      return;
    }
    next();
  };
}

async function getSystemInfo() {
  const disk = await checkDiskSpace(process.cwd());
  return {
    os: os.platform(),
    os_version: os.release(),
    arch: os.arch(),
    cpu_cores: os.cpus().length,
    memory_bytes: os.totalmem(),
    disk_free_bytes: disk.free,
    hostname: os.hostname()
  };
}

async function detectOpenClaw() {
  if (isMockRuntime()) {
    return {
      installed: true,
      running: true,
      version: "0.0.0-mock",
      service_manager: "mock",
      config_path: path.resolve(os.homedir(), ".openclaw/openclaw.json"),
      last_start_time: new Date().toISOString(),
      restart_count_24h: 0,
      gateway_connected: true
    };
  }

  const isWindows = process.platform === "win32";
  const whichCommand = isWindows ? "where" : "which";
  const result = await runCommand(whichCommand, ["openclaw"]);
  const installed = result.exitCode === 0;

  let version: string | null = null;
  if (installed) {
    const versionResult = await runCommand("openclaw", ["--version"]);
    version = versionResult.exitCode === 0 ? versionResult.stdout.trim() : null;
  }

  return {
    installed,
    running: false,
    version,
    service_manager: "unknown",
    config_path: null,
    last_start_time: null,
    restart_count_24h: 0,
    gateway_connected: false
  };
}

export function createApp() {
  const app = express();

  app.use(requestIdMiddleware());
  app.use(express.json());
  app.use(
    cors({
      origin: ["http://127.0.0.1:3000", "http://127.0.0.1:5173"],
      credentials: true
    })
  );

  const pairingLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false
  });

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  app.post("/pair/start", pairingLimiter, (_req, res) => {
    const code = createPairingCode();
    pairingStore.set(code, {
      code,
      expiresAt: Date.now() + PAIRING_TTL_SECONDS * 1000
    });
    res.json({ pairing_code: code, expires_in_seconds: PAIRING_TTL_SECONDS });
  });

  app.post("/pair/confirm", pairingLimiter, (req, res) => {
    const { pairing_code: pairingCode, device_name: deviceName } = req.body ?? {};
    if (typeof pairingCode !== "string" || typeof deviceName !== "string") {
      res.status(401).json({ code: "unauthorized", message: "Unauthorized" });
      return;
    }

    const record = pairingStore.get(pairingCode);
    if (!record || record.expiresAt < Date.now()) {
      res.status(401).json({ code: "unauthorized", message: "Unauthorized" });
      return;
    }

    pairingStore.delete(pairingCode);
    const accessToken = issueToken();
    tokenStore.set(accessToken.token, accessToken);
    const refreshToken = issueToken();
    tokenStore.set(refreshToken.token, refreshToken);

    res.json({
      access_token: accessToken.token,
      expires_in_seconds: ACCESS_TOKEN_TTL_SECONDS,
      refresh_token: refreshToken.token
    });
  });

  app.get("/system/info", authMiddleware(), async (_req, res) => {
    const systemInfo = await getSystemInfo();
    res.json(systemInfo);
  });

  app.get("/moltbot/status", authMiddleware(), async (_req, res) => {
    const status = await detectOpenClaw();
    res.json(status);
  });

  app.get("/logs/tail", authMiddleware(), (req, res) => {
    const lines = Number(req.query.lines ?? 200);
    const redact = req.query.redact !== "false";
    const selected = fixtureLogs.slice(-Math.min(Math.max(lines, 10), 5000));
    const output = redact ? redactLines(selected) : selected;
    res.json({ lines: output, redacted: redact });
  });

  app.get("/logs/stream", authMiddleware(), (req, res) => {
    const redact = req.query.redact !== "false";
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let index = 0;
    const interval = setInterval(() => {
      const line = fixtureLogs[index % fixtureLogs.length];
      const output = redact ? redactLines([line])[0] : line;
      res.write(`data: ${output}\n\n`);
      index += 1;
    }, 1000);

    req.on("close", () => {
      clearInterval(interval);
    });
  });

  return app;
}
