// "use client";

import React from "react";
import productService from "@/service/product-service";
import ProductCard from "@/components/ProductCard/ProductCard";

async function loadProducts() {
  const response = await productService.getProducts(true);

  return response;
}

const ProductsPage = async () => {
  const products = await loadProducts();

  return (
    <div className="grid gap-4 grid-cols-4">
      {products.map((product, index) => {
        return <ProductCard key={product.uuid || index} product={product} />;
      })}
    </div>
  );
};

export default ProductsPage;
