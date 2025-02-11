import { test, expect } from "vitest";

test("Should return the database health.", async () => {
  const response = await fetch("http://localhost:3000/status");
  const data = await response.json();
  console.log(data);
  expect(data.status).toBe(200);
  expect(Number(data.data.maxConnections)).toBe(100);
  expect(Number(data.data.openConnections)).toBeGreaterThan(0);
});
