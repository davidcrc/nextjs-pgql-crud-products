import React from 'react';
import productService from '@/service/product-service';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';

async function loadProduct(productUuid: string) {
  const response = await productService.getProduct(
    { product_uuid: productUuid },
    true,
  );

  return response;
}

interface ProductProps {
  params: {
    id: string;
  };
}

const Product = async ({ params }: ProductProps) => {
  const product = await loadProduct(params.id);

  return (
    <Card className='max-w-[400px]'>
      <CardBody>
        <p className='text-lg font-bold'>Name: {product?.name}</p>
        <p className='text-2xl text-slate-600'>
          Price: {Number(product?.price)}
        </p>
        <p>Description: {product?.description || '-'}</p>
      </CardBody>
      <Divider />
      <CardFooter className='gap-2 justify-end'>
        <Button size='md' color='danger' className='hover:bg-red-700'>
          Remove
        </Button>
        <Button size='md' color='success' className='hover:bg-green-700'>
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Product;
