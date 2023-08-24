import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "listing product" });
}

export function DELETE() {
  return NextResponse.json({ message: "deleting product" });
}

export function PUT() {
  return NextResponse.json({ message: "updating product" });
}
