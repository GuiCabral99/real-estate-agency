import { Pool } from "pg";

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  ssl: process.env.NODE_ENV === "development" || "test" ? false : true,
});

export default async function query(queryObject: string, params?: any[]) {
  const result = await pool.query(queryObject, params);
  return result;
}
