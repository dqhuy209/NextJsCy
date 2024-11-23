const { GET, POST } = require("@/service/authService");

export const getProducts = async () => {
  return await GET("/products");
};
export const checkout = async (address, phone, cart) => {
  return await POST("/order", {
    address: address,
    phone: phone,
    cart_item: cart,
  });
};
export const getOrders = async () => {
  return await GET("/orders");
};
