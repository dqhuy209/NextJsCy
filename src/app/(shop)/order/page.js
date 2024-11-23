"use client";
import { getOrders } from "@/utils/apiProducts";
import formatMoney from "@/utils/formatMoney";
import React, { useEffect, useState } from "react";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const loadOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch (err) {
      console.log("Failed to load", err);
    }
  };
  useEffect(() => {
    loadOrders();
  }, []);
  const toggleDetail = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, showDetails: !order.showDetails }
          : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-12">
      <div className="max-w-4xl mx-auto px-8">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
          Danh Sách Đơn Hàng
        </h2>
        {orders.length === 0 ? (
          <div className="text-center text-xl text-gray-700">
            Bạn chưa có đơn hàng nào.
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id}>
              <div className="bg-white shadow-lg rounded-xl p-6 mb-8 transition-transform transform hover:scale-105">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Đơn Hàng {order.id}
                </h3>
                <p className="text-lg text-gray-700 mb-1">
                  Ngày Tạo: {new Date(order.created_at).toLocaleDateString()}
                </p>
                <p className="text-lg text-gray-700 mb-1">
                  Địa Chỉ: {order.address}
                </p>
                <p className="text-lg text-gray-700 mb-1">
                  Tổng Tiền:{" "}
                  <span className="font-semibold">
                    {" "}
                    {formatMoney(order.total)}
                  </span>
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  Trạng Thái:{" "}
                  <span className="font-semibold">{order.status}</span>
                </p>
                {/* detail */}
                <button
                  onClick={() => toggleDetail(order.id)}
                  className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none"
                >
                  Xem Chi Tiết
                </button>
                {order.showDetails && (
                  <table className="min-w-full mt-6 table-auto border-separate border-spacing-0 rounded-lg overflow-hidden">
                    <thead className="bg-indigo-600 text-white">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-semibold w-2/5">
                          Tên Sản Phẩm
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold w-1/5">
                          Số Lượng
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold w-1/5">
                          Giá
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold w-2/5">
                          Tổng Tiền
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-gray-800">
                      {order.order_items.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b hover:bg-gray-100"
                        >
                          <td className="py-3 px-4 text-sm">{item.name}</td>
                          <td className="py-3 px-4 text-sm">{item.quantity}</td>
                          <td className="py-3 px-4 text-sm">
                            {formatMoney(item.price)}{" "}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {formatMoney(item.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
