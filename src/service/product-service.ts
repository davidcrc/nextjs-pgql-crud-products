import { apiMocked } from "@/axios/index";
import endpoints from "@/endpoints";
import { ProductDto } from "./product.dto";
import { Product } from "@prisma/client";

type GetInput = {
  product_uuid?: string;
};

const getProduct = async (input: GetInput) => {
  const { product_uuid } = input;

  if (!product_uuid) {
    return;
  }

  try {
    const { data } = await apiMocked.get<Product>(
      `${endpoints.product.get(product_uuid)}`
    );

    return data;
  } catch (error) {
    throw error;
  }
};

const getProducts = async ({ product_uuid }: GetInput) => {
  try {
    const { data } = await apiMocked.get<Array<Product>>(
      endpoints.product.get(product_uuid)
    );

    return data;
  } catch (error) {
    throw error;
  }
};

const createProduct = async (product: ProductDto) => {
  try {
    const { data } = await apiMocked.post<Product>(endpoints.product.create(), {
      ...product,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

const productManagement = {
  getProduct,
  getProducts,
  createProduct,
};

export default productManagement;
