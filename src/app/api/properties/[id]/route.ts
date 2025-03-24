import { NextResponse } from "next/server";
import {
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../../../../services/property";
import { Property } from "../../../../types/property";

export async function GET(_: Request, { params }: { params: { id: number } }) {
  try {
    const property = await getPropertyById(Number(params.id));
    if (!property)
      return NextResponse.json(
        { error: "Propriedade não encontrada" },
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
        { error: "Propriedade não encontrada" },
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
  { params }: { params: { id: string } },
) {
  try {
    await deleteProperty(Number(params.id));
    return NextResponse.json({ message: "Propriedade removida com sucesso." });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
