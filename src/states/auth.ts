import { NavigateFunction } from "react-router-dom";
import { create } from "zustand";
import Cookies from "js-cookie";
import { userLogin, userRegister } from "../types";
import { TOKEN, USERID} from "../constants";
import { request } from "../request";



type AuthTypes = {
  isAuthenticated: boolean;
  login: (data: userLogin, navigate: NavigateFunction) => void;
  logout: (navigate: NavigateFunction) => void;
  register: (data: userRegister, navigate: NavigateFunction) => void;
  userId: string;
  role: string | null;
  
};

export const useAuth = create<AuthTypes>((set, get) => ({
  isAuthenticated: Cookies.get(TOKEN) ? true : false,
  userId : Cookies.get(USERID) || '',
  role: null,
  login: async (data, navigate) => {
    try {
      const res = await request.post("auth/login", data);
      Cookies.set(TOKEN, res.data.token);
      Cookies.set(USERID, res.data.user._id);
      set({ isAuthenticated: true, role: res.data.user.role, userId: res.data.user._id});
      if (get().role === "admin") {
        navigate("/dashboard");
      } else if (get().role === "client") {
        navigate("/home");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.log(err)
    }
  },
  logout: (navigate) => {
    Cookies.remove(TOKEN);
    set({ isAuthenticated: false });
    navigate("/");
  },
  register: async (data, navigate) => {
    try {
      const res = await request.post("auth/register", data); 
      Cookies.set(TOKEN, res.data.token);
      set({ isAuthenticated: true });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  },
}));
