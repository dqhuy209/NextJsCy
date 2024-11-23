"use client";
import useCartStore from "@/store/useCartStore";
import formatMoney from "@/utils/formatMoney";
import React from "react";

export default function ItemProduct({ product }) {
  const cartStore = useCartStore();
  const addToCart = (product) => {
    cartStore.addItem(product, 1);
  };
  return (
    <div>
      <div className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300">
        <img
          src={product.preview_img_path}
          alt="imgItem"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-semibold line-clamp-2 mb-2 text-gray-900">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">
            Price: {formatMoney(product.price)}
          </span>
          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            className={`w-full px-4 py-2 rounded-full text-white transition duration-300 ${
              product.stock > 0
                ? "bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-purple-500"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={product.stock === 0}
            onClick={() => addToCart(product)}
          >
            {product.stock > 0 ? "Thêm vào giỏ hàng" : "Hết hàng"}
          </button>
        </div>
      </div>
    </div>
  );
}
