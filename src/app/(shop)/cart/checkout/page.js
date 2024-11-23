"use client";

import useCartStore from "@/store/useCartStore";
import { checkout } from "@/utils/apiProducts";
import formatMoney from "@/utils/formatMoney";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

export default function Checkout() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const itemTotal = (item) => {
    return item.product.price * item.quantity;
  };
  const totalAmount = useMemo(() => {
    return items.reduce((total, item) => total + itemTotal(item), 0);
  }, [items]);
  const handleCheckout = async (e) => {
    if (!address || !phone) {
      return;
    }
    e.preventDefault();
    const orderData = items.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
      name: item.product.name,
    }));
    console.log(orderData);
    try {
      const res = await checkout(address, phone, orderData);
      toast.success("Order checkout successful");
      clearCart();
      router.push("/order");
    } catch (e) {
      toast.error("Failed to checkout, please try again later");
      clearCart();
    }
  };
  if (items.length === 0) {
    return (
      <div className="min-h-screen  bg-gray-100 py-6">
        <div className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Cart is empty, please add some products.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Thông Tin Giao Hàng
        </h2>

        <form
          onSubmit={handleCheckout}
          className="bg-white shadow-lg rounded-lg p-6"
        >
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-gray-700 font-medium mb-2"
            >
              Địa Chỉ
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Nhập địa chỉ giao hàng"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
            >
              Số Điện Thoại
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Nhập số điện thoại"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Tóm Tắt Đơn Hàng</h3>
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between mb-2">
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span>{formatMoney(itemTotal(item))}</span>
              </div>
            ))}
            <div className="flex justify-between mt-4 font-semibold">
              <span>Tổng Tiền:</span>
              <span className="text-green-500">{formatMoney(totalAmount)}</span>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300">
              Đặt Hàng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
