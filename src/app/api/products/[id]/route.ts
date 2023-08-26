import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(_: NextRequest, { params }: Params) {
  const { id } = params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        uuid: id,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    }
  }
}

export function DELETE() {
  return NextResponse.json({ message: "deleting product" });
}

export function PUT() {
  return NextResponse.json({ message: "updating product" });
}
