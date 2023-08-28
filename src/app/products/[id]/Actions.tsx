'use client';

import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import productService from '@/service/product-service';

const Actions = ({ productUUID }: { productUUID: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    if (confirm('are you sure you want to delete this product?')) {
      setLoading(true);
      try {
        // TODO: this could be use useQuery
        const response = await productService.deleteProduct({
          product_uuid: productUUID,
        });

        router.push('/products');
        router.refresh();
      } catch (error) {
        console.log('err', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = async () => {};

  return (
    <>
      <Button
        size='md'
        color='danger'
        className='hover:bg-red-700'
        onClick={handleRemove}
      >
        Remove
      </Button>
      <Button
        size='md'
        color='success'
        className='hover:bg-green-700'
        onClick={handleEdit}
      >
        Edit
      </Button>
    </>
  );
};

export default Actions;
