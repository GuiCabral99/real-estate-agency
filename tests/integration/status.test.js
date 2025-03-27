import { test, expect, describe } from "vitest";

describe("Server helth", () => {
  test("Should return the database health.", async () => {
    const req = await fetch("http://localhost:3000/api/status");
    const data = await req.json();
    expect(data.status).toBe(200);
    expect(Number(data.data.maxConnections)).toBe(100);
    expect(Number(data.data.openConnections)).toBeGreaterThan(0);
  });
});
