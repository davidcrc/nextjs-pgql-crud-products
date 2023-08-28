import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const products = await prisma.product.findMany();

    return NextResponse.json(products);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    if (!data) {
      return NextResponse.json({
        message: 'Some fields are required',
      });
    }

    console.log('AQUI CREA', data.get('iamge'));
    const image = data.get('iamge') as File;

    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filePath = path.join(process.cwd(), 'public', image.name);
      writeFile(filePath, buffer);
    }

    const product = await prisma.product.create({
      data: {
        name: data.get('name') as string,
        price: data.get('price') as string,
        description: data.get('description') as string,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message, { status: 500 });
    }
  }
}
