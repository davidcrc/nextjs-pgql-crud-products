import React from 'react';
import productService from '@/service/product-service';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import Actions from './Actions';

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
    <div className='flex w-full justify-center'>
      <Card className='min-w-[400px] max-w-[610px]'>
        <CardBody>
          <p className='text-lg font-bold'>Name: {product?.name}</p>
          <p className='text-2xl text-slate-600'>
            Price: {Number(product?.price)}
          </p>
          <p>Description: {product?.description || '-'}</p>
        </CardBody>
        <Divider />
        <CardFooter className='gap-2 justify-end'>
          <Actions productUUID={params.id} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Product;
