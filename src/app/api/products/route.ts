import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export function GET() {
  return NextResponse.json({ message: "listing products" });
}

export async function POST(request: NextRequest) {
  const { name, description, price } = await request.json();

  try {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    }
  }
}
