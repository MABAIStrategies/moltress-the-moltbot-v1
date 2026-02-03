import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import request from "supertest";
import yaml from "yaml";
import OpenAPIResponseValidator from "openapi-response-validator";
import { createApp } from "../src/app.js";

const specPath = path.resolve(process.cwd(), "api/openapi.yaml");
const spec = yaml.parse(fs.readFileSync(specPath, "utf-8"));

const responseValidator = new OpenAPIResponseValidator({
  openapi: spec
});

const app = createApp();

function expectValidResponse(pathKey: string, method: string, status: number, body: unknown) {
  const error = responseValidator.validateResponse(status, pathKey, method, body);
  if (error) {
    expect(error.errors ?? error).toEqual([]);
  }
}

describe("contract responses", () => {
  it("/health", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expectValidResponse("/health", "get", 200, res.body);
  });

  it("/pair/start", async () => {
    const res = await request(app).post("/pair/start");
    expect(res.status).toBe(200);
    expectValidResponse("/pair/start", "post", 200, res.body);
  });

  it("/pair/confirm unauthorized", async () => {
    const res = await request(app).post("/pair/confirm").send({});
    expect(res.status).toBe(401);
    expectValidResponse("/pair/confirm", "post", 401, res.body);
  });
});
