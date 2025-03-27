import { NextResponse } from "next/server";
import query from "../../../../infra/database/database";

export async function GET() {
  try {
    const initalOpenConnections = await query(
      "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = 'local_db';",
    );
    const maxConnections = await query("SHOW max_connections;");
    const openConnections = await query(
      "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = 'local_db';",
    );
    return NextResponse.json({
      status: 200,
      data: {
        maxConnections: maxConnections.rows[0].max_connections,
        openConnections: openConnections.rows[0].count,
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
