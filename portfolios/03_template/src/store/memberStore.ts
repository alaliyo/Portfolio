import { create } from "zustand";
import { MemberData } from "../dtos/member.dto";

interface AuthState {
  token: string | null;
  me: MemberData | null;
  setToken: (token: string | null) => void;
  setMe: (me: MemberData | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  me: null,
  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    set({ token });
  },
  setMe: (me) => set({ me }),
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    set({ token: null, me: null });
  },
}));