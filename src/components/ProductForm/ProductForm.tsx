"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Textarea } from "@nextui-org/react";
import productService from "@/service/product-service";
import { ProductFormType } from ".";

const ProductForm = () => {
  const [loading, setLoading] = useState(false);
  const formMethods = useForm<ProductFormType>({
    defaultValues: {
      name: "",
      price: "",
      description: "",
    },
  });

  const { control, handleSubmit, reset } = formMethods;

  const onSubmit = async (data: ProductFormType) => {
    console.log("data", data);

    setLoading(true);
    try {
      // TODO: this could be use useQuery
      const response = await productService.createProduct({
        name: data.name,
        price: data.price,
        description: data.description,
      });

      console.log("mmm", response);

      reset({});
    } catch (error) {
      console.log("err", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 gap-3 w-[500px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            radius="sm"
            variant="bordered"
            labelPlacement="outside"
            label="Product Name"
            placeholder="name"
          />
        )}
      />

      <Controller
        control={control}
        name="price"
        render={({ field }) => (
          <Input
            {...field}
            type="number"
            radius="sm"
            variant="bordered"
            labelPlacement="outside"
            label="Product Price:"
            placeholder="0.00"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <Textarea
            {...field}
            type="text"
            radius="sm"
            variant="bordered"
            labelPlacement="outside"
            label="Product Description:"
            placeholder="description"
          />
        )}
      />

      <Button
        type="submit"
        color="primary"
        className="hover:bg-blue-700"
        isLoading={loading}
      >
        Save Product
      </Button>
    </form>
  );
};

export default ProductForm;
