import { getProducts } from "@/utils/apiProducts";
import React from "react";
import ItemProduct from "./ItemProduct";

export default async function Product() {
  const products = await getProducts();
  return (
    <div className="min-h-screen mx-auto p-6 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Danh Sách Sản Phẩm
      </h2>
      {!products.data.data.length ? (
        <div className="text-center text-3xl py-8">No products</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.data.data.map((product, index) => (
            <ItemProduct key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
