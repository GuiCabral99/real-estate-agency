import { test, expect } from "vitest";

test("Should connect to database", async () => {
  const response = await fetch("http://localhost:3000/status");
  const data = await response.json();
  expect(data.status).toBe(200);
  expect(Number(data.data.maxConnections)).toBe(100);
});
