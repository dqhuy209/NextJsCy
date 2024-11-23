const { persist } = require("zustand/middleware");
const { create } = require("zustand");
const useAuthStore = create(
  persist((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
  })),
  {
    name: "auth-store",
  }
);
export default useAuthStore;
