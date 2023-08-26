import { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface ProductProps {
  product: Product;
}

const ProductCard = ({ product }: ProductProps) => {
  const { uuid, name, price, description } = product;

  return (
    <Link
      className="bg-white rounded-lg border-gray-800 mb-3 p-4 hover:cursor-pointer hover:bg-gray-200 hover:transition-all"
      href={`/products/${uuid}`}
    >
      <h1 className="text-lg font-bold">{name}</h1>
      <h2 className="text-2xl text-slate-600">{Number(price)}</h2>
      <p>{description || "-"}</p>
    </Link>
  );
};

export default ProductCard;
