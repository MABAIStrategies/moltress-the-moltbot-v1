import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";

process.env.MOCK_RUNTIME = "1";

const app = createApp();

describe("golden path", () => {
  it("pair -> token -> system/info -> status -> logs/tail", async () => {
    const pairStart = await request(app).post("/pair/start");
    expect(pairStart.status).toBe(200);

    const pairConfirm = await request(app)
      .post("/pair/confirm")
      .send({ pairing_code: pairStart.body.pairing_code, device_name: "test-device" });

    expect(pairConfirm.status).toBe(200);

    const token = pairConfirm.body.access_token as string;

    const systemInfo = await request(app)
      .get("/system/info")
      .set("Authorization", `Bearer ${token}`);

    expect(systemInfo.status).toBe(200);

    const status = await request(app)
      .get("/moltbot/status")
      .set("Authorization", `Bearer ${token}`);

    expect(status.status).toBe(200);

    const logs = await request(app)
      .get("/logs/tail?lines=200&redact=true")
      .set("Authorization", `Bearer ${token}`);

    expect(logs.status).toBe(200);
    expect(logs.body.redacted).toBe(true);
  });
});
