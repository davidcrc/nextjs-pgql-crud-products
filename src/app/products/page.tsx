// "use client";

import React from "react";
import productService from "@/service/product-service";

async function loadProducts() {
  const response = await productService.getProducts(true);

  return response;
}

const ProductsPage = async () => {
  const products = await loadProducts();

  return (
    <div className="grid gap-4 grid-cols-4">
      {products.map(({ uuid, name, price, description }) => {
        return (
          <div
            key={uuid}
            className="bg-white rounded-lg border-gray-800 mb-3 p-4 "
          >
            <h1 className="text-lg font-bold">{name}</h1>
            <h2 className="text-2xl text-slate-600">{Number(price)}</h2>
            <p>{description || "-"}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsPage;
