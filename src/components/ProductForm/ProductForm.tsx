'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Input,
  Textarea,
  Image,
  Divider,
  Badge,
} from '@nextui-org/react';
import productService from '@/service/product-service';
import { ProductFormType } from '.';
import { useParams, useRouter } from 'next/navigation';
import { CameraIcon, CloseIcon } from '@/ui/Icons';
import { Blob } from 'buffer';

const ProductForm = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  // const [file, setFile] = useState<File>();
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const formMethods = useForm<ProductFormType>({
    defaultValues: {
      name: '',
      price: '',
      description: '',
    },
  });

  const productId = params.id as string;

  const { control, handleSubmit, reset, setValue, watch } = formMethods;
  const file = watch('image');

  const onCreate = async (data: ProductFormType) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('price', data.price);
      formData.append('description', data.description);
      if (data?.image) {
        formData.append('image', data?.image);
      }

      const response = await productService.createProductv2(formData);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];

    if (file) {
      setValue('image', file);
    }
  };

  const handleSelectFile = () => {
    fileInputRef?.current?.click();
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
    <div className=''>
      <form
        className='flex flex-col mx-auto bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 gap-3 w-[500px]'
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
          type='button'
          aria-label='Upload product image'
          color='warning'
          variant={file ? 'shadow' : 'ghost'}
          onClick={handleSelectFile}
          isIconOnly
        >
          <CameraIcon />
        </Button>

        <input
          type='file'
          accept='image/*'
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {file && (
          <>
            <Divider />
            <Badge
              content={
                <Button
                  type='button'
                  aria-label='Upload product image'
                  // color='warning'
                  // variant='ghost'
                  className='m-2 hover:bg-red-300'
                  radius='full'
                  onClick={() => setValue('image', undefined)}
                  isIconOnly
                >
                  <CloseIcon />
                </Button>
              }
              size='md'
              // color='default'
            >
              <Image
                className='w-full h-60 object-contain mx-auto '
                alt='Image preview'
                src={URL.createObjectURL(file)}
              />
            </Badge>
          </>
        )}

        <Button
          type='submit'
          color='primary'
          className='hover:bg-blue-700'
          isLoading={loading}
        >
          {productId ? 'Edit' : 'Save'} Product
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
