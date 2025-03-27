import { NextResponse } from "next/server";
import {
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../../../../services/property";
import { Property } from "../../../../types/property";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: number }> },
) {
  const { id } = await params;
  try {
    const property = await getPropertyById(Number(id));
    if (!property)
      return NextResponse.json(
        { error: "Property not found." },
        { status: 404 },
      );

    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const data: Property = await req.json();
    const updatedProperty = await updateProperty(Number(id), data);

    if (!updatedProperty)
      return NextResponse.json(
        { error: "Property not found." },
        { status: 404 },
      );

    return NextResponse.json(updatedProperty);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await deleteProperty(Number(id));
    return NextResponse.json({
      message: "Property has been successfully removed.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
