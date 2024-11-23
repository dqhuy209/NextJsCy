import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-blue-100 to-white min-h-screen font-sans">
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Chào mừng đến với MyWebsite
          </h1>
          <p className="text-xl mb-8">
            Nơi cung cấp giải pháp tốt nhất cho mọi nhu cầu của bạn.
          </p>

          <div className="flex justify-center">
            <Link
              href="/products"
              className="px-8 py-3 bg-cyan-400 w-[300px] text-blue-700 rounded-full font-semibold hover:bg-cyan-500 transition duration-300"
            >
              Xem sản phẩm
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
            Tính năng nổi bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition duration-300">
              <div className="text-purple-600 text-6xl mb-4">⚙️</div>
              <h3 className="text-2xl font-semibold mb-2 text-blue-800">
                Dễ sử dụng
              </h3>
              <p className="text-gray-600">
                Giao diện thân thiện và dễ dàng thao tác, giúp bạn tiết kiệm
                thời gian.
              </p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition duration-300">
              <div className="text-purple-600 text-6xl mb-4">💼</div>
              <h3 className="text-2xl font-semibold mb-2 text-blue-800">
                Đa chức năng
              </h3>
              <p className="text-gray-600">
                Tích hợp nhiều tính năng hữu ích đáp ứng nhu cầu của bạn.
              </p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition duration-300">
              <div className="text-purple-600 text-6xl mb-4">🔒</div>
              <h3 className="text-2xl font-semibold mb-2 text-blue-800">
                Bảo mật cao
              </h3>
              <p className="text-gray-600">
                Bảo mật dữ liệu là ưu tiên hàng đầu, giúp bạn an tâm khi sử
                dụng.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 py-16 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Liên hệ với chúng tôi</h2>
          <p className="mb-8">
            Hãy để lại tin nhắn, chúng tôi sẽ liên hệ lại với bạn sớm nhất có
            thể!
          </p>
          <div className="flex justify-center">
            <h2 className="px-8 py-3 bg-cyan-400 w-[300px] text-blue-700 rounded-full font-semibold hover:bg-cyan-500 transition duration-300">
              Liên hệ ngay
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}
