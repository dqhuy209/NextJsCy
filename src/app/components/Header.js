"use client";
import useAuthStore from "@/store/useAuthStore";
import React, { useEffect, useState } from "react";
import { logout, userProfile } from "../../utils/apiAuth";
import { useUtils } from "@/utils/useUtils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Header() {
  const { user, clearUser, setUser } = useAuthStore();
  const router = useRouter();
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookie = document.cookie;
      setToken(cookie);
    }
  }, []);
  const userName = async () => {
    if (token) {
      try {
        const response = await userProfile();
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
      useUtils().deleteCookieOnClient("token");
      router.push("/");
      toast.success("Logged out");
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    userName();
  }, [token, setUser]);
  return (
    <header className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-500 to-purple-600 shadow-md">
      <div className="text-3xl font-extrabold text-white">
        <Link
          href="/"
          className="hover:text-yellow-300 transition duration-300"
        >
          MyWebsite
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          href="/products"
          className="px-4 py-2 bg-emerald-400 text-blue-700 rounded-full font-semibold hover:bg-cyan-500 transition duration-300"
        >
          Sản phẩm
        </Link>
        <Link
          href="/cart"
          className="px-4 py-2 bg-cyan-400 text-blue-700 rounded-full font-semibold hover:bg-cyan-500 transition duration-300"
        >
          🛒 Giỏ hàng
        </Link>
        <Link
          href="/order"
          className="px-4 py-2 bg-green-400 text-blue-700 rounded-full font-semibold hover:bg-green-500 transition duration-300"
        >
          📦 Đơn hàng
        </Link>
        {user ? (
          <div className="flex items-center space-x-3">
            <p className="text-white">Hi! {user.name || "Loading..."}</p>
            <button
              onClick={handleLogout}
              className="bg-cyan-500 text-white px-4 py-2 rounded"
            >
              Đăng Xuất
            </button>
          </div>
        ) : (
          <div>
            <Link
              href="/login"
              className="px-6 py-2 bg-cyan-400 text-blue-700 rounded-full font-semibold hover:bg-cyan-500 transition duration-300"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
