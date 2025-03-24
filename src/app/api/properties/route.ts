import { NextResponse } from "next/server";
import { getAllProperties, createProperty } from "../../../services/property";

export async function GET() {
  try {
    const properties = await getAllProperties();
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newProperty = await createProperty(data);
    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
