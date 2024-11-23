"use client";
import { login, POST } from "@/utils/apiAuth";
import useAuthStore from "@/store/useAuthStore";
import { useUtils } from "@/utils/useUtils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const authStore = useAuthStore();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      if (res.data.token) {
        document.cookie = `token=${res.data.token}; path=/; max-age=36000`;
      }
      console.log("res", res.data.user.name);
      setError("");
      authStore.setUser(res.data.user);
      // authStore.token(res.data.token);
      toast.success("Login successful");
      router.push("/");
    } catch (e) {
      console.log("error", e);
      setError("Tài khoản hoặc mật khẩu không đúng");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Đăng nhập
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="Nhập email của bạn"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="Nhập mật khẩu của bạn"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Đăng nhập
          </button>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          <div className="text-center mt-6">
            <Link
              href="/register"
              className="text-indigo-500 hover:text-indigo-700 transition duration-200"
            >
              Chưa có tài khoản? Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
