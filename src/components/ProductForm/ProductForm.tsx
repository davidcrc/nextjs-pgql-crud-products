'use client';

import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Textarea } from '@nextui-org/react';
import productService from '@/service/product-service';
import { ProductFormType } from '.';
import { useParams, useRouter } from 'next/navigation';

const ProductForm = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formMethods = useForm<ProductFormType>({
    defaultValues: {
      name: '',
      price: '',
      description: '',
    },
  });

  const productId = params.id as string;

  const { control, handleSubmit, reset } = formMethods;

  const onCreate = async (data: ProductFormType) => {
    try {
      // TODO: this could be use useQuery
      const response = await productService.createProduct({
        name: data.name,
        price: data.price,
        description: data.description,
      });

      console.log('mmm', response);

      reset({});
      router.push('/products');
    } catch (error) {
      console.log('err', error);
    } finally {
      setLoading(false);
    }
  };

  const onEdit = async (data: ProductFormType) => {
    try {
      // TODO: this could be use useQuery
      await productService.updateProduct({
        uuid: productId,
        name: data.name,
        price: data.price,
        description: data.description,
      });

      router.push('/products');
      router.refresh();
    } catch (error) {
      console.log('err', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProductFormType) => {
    setLoading(true);

    if (!productId) {
      onCreate(data);
    } else {
      onEdit(data);
    }
  };

  useEffect(() => {
    if (productId) {
      productService
        .getProduct({
          product_uuid: productId,
        })
        .then((data) => {
          if (data) {
            reset({
              name: data.name,
              price: data.price.toString(),
              description: data.description,
            });
          }
        });
    }
  }, []);

  return (
    <form
      className='flex flex-col bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 gap-3 w-[500px]'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name='name'
        render={({ field }) => (
          <Input
            {...field}
            type='text'
            radius='sm'
            variant='bordered'
            labelPlacement='outside'
            label='Product Name'
            placeholder='name'
            autoFocus
          />
        )}
      />

      <Controller
        control={control}
        name='price'
        render={({ field }) => (
          <Input
            {...field}
            type='number'
            radius='sm'
            variant='bordered'
            labelPlacement='outside'
            label='Product Price:'
            placeholder='0.00'
            startContent={
              <div className='pointer-events-none flex items-center'>
                <span className='text-default-400 text-small'>$</span>
              </div>
            }
          />
        )}
      />

      <Controller
        control={control}
        name='description'
        render={({ field }) => (
          <Textarea
            {...field}
            type='text'
            radius='sm'
            variant='bordered'
            labelPlacement='outside'
            label='Product Description:'
            placeholder='description'
          />
        )}
      />

      <Button
        type='submit'
        color='primary'
        className='hover:bg-blue-700'
        isLoading={loading}
      >
        {productId ? 'Edit' : 'Save'} Product
      </Button>
    </form>
  );
};

export default ProductForm;
