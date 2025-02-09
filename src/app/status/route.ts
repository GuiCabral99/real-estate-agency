import { NextResponse } from "next/server";
import query from "../../../infra/database";

export async function GET(request: Request) {
  try {
    const maxConnections = await query("SHOW max_connections;");

    return NextResponse.json({
      status: 200,
      data: { maxConnections: maxConnections[0].max_connections },
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
