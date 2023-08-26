import { apiMocked } from "@/axios/index";
import endpoints from "@/endpoints";
import { ProductDto } from "./product.dto";
import { Product } from "@prisma/client";

type GetInput = {
  product_uuid?: string;
};

const getProduct = async (input: GetInput, usingSSR: boolean = false) => {
  const { product_uuid } = input;

  if (!product_uuid) {
    return;
  }

  const url = usingSSR
    ? `${process.env.API_URL}/api${endpoints.product.get(product_uuid)}`
    : endpoints.product.get(product_uuid);

  try {
    const { data } = await apiMocked.get<Product>(url);

    return data;
  } catch (error) {
    throw error;
  }
};

const getProducts = async (usingSSR: boolean = false) => {
  const url = usingSSR
    ? `${process.env.API_URL}/api${endpoints.product.get()}`
    : endpoints.product.get();

  try {
    const { data } = await apiMocked.get<Array<Product>>(url);

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
