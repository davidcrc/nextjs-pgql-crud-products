import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "listing products" });
}

export function POST() {
  return NextResponse.json({ message: "creating product" });
}
