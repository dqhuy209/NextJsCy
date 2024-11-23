"use client";
import useCartStore from "@/store/useCartStore";
import formatMoney from "@/utils/formatMoney";
import Link from "next/link";
import React, { useMemo } from "react";
import { toast } from "react-toastify";

export default function Cart() {
  const { items, updateItemQuantity, removeItem } = useCartStore();

  const itemTotal = (item) => {
    return item.product.price * item.quantity;
  };
  // const totalAmout = items.reduce((total, item) => total + itemTotal(item), 0);
  const totalAmount = useMemo(() => {
    return items.reduce((total, item) => total + itemTotal(item), 0);
  }, [items]);
  const updateItem = (item) => {
    updateItemQuantity(item.product.id, item.quantity);
  };
  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      item.quantity--;
      updateItem(item);
    }
  };
  const increaseQuantity = (item) => {
    if (item.quantity < item.product.stock) {
      item.quantity++;
      updateItem(item);
    } else {
      toast.info("Đã vượt quá số lượng trong kho");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Giỏ Hàng
        </h2>
        {items.length === 0 ? (
          <div className="text-center text-xl text-gray-600">
            Giỏ hàng của bạn đang trống.
          </div>
        ) : (
          <div>
            <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-4 px-8 text-left text-gray-700 whitespace-nowrap">
                      Sản Phẩm
                    </th>
                    <th className="py-4 px-8 text-left text-gray-700 whitespace-nowrap">
                      Số Lượng
                    </th>
                    <th className="py-4 px-8 text-left text-gray-700 whitespace-nowrap">
                      Đơn Giá
                    </th>
                    <th className="py-4 px-8 text-left text-gray-700 whitespace-nowrap">
                      Tổng Tiền
                    </th>
                    <th className="py-4 px-8 text-left text-gray-700 whitespace-nowrap">
                      Hành Động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.product.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-4 px-8 flex items-center">
                        <img
                          src={
                            item.product.preview_img_path ||
                            "https://via.placeholder.com/100"
                          }
                          alt="Product Image"
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <span className="text-gray-800">
                          {item.product.name}
                        </span>
                      </td>
                      <td className="py-4 px-8">
                        <div className="flex items-center">
                          <button
                            onClick={() => decreaseQuantity(item)}
                            className="px-3 py-1 bg-gray-200 rounded-l-md hover:bg-gray-300 focus:outline-none"
                          >
                            -
                          </button>
                          <span className="w-12 text-center border-t border-b border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item)}
                            className="px-3 py-1 bg-gray-200 rounded-r-md hover:bg-gray-300 focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-8 text-gray-700">
                        {formatMoney(item.product.price)}
                      </td>
                      <td className="py-4 px-8 text-gray-700">
                        {formatMoney(itemTotal(item))}
                      </td>
                      <td className="py-4 px-8">
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-red-500 hover:text-red-700 transition duration-200"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-between items-center">
              <p className="text-2xl font-bold text-gray-900">
                Tổng Tiền:
                <span className="text-green-500">
                  {formatMoney(totalAmount)}
                </span>
              </p>
              <Link
                href="/cart/checkout"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Tiến Hành Thanh Toán
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
