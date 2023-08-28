import React from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Product } from '@prisma/client';
import Link from 'next/link';

interface ProductProps {
  product: Product;
}

const ProductCard = ({ product }: ProductProps) => {
  const { uuid, name, price, description } = product;

  return (
    <Link href={`/products/${uuid}`}>
      <Card className=' hover:bg-gray-200 hover:transition-all'>
        <CardHeader className='flex gap-3'>
          <h1 className='text-lg font-bold'>{name}</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <h2 className='text-2xl text-slate-600'>{Number(price)}</h2>
          <p>{description || '-'}</p>
        </CardBody>
        <Divider />
      </Card>
    </Link>
  );
};

export default ProductCard;
