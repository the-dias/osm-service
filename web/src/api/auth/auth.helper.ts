import { ITokens, IAuthResponse } from "./types/user.interface";
import Cookies from "js-cookie";

export const saveTokensStorage = (data: ITokens) => {
  Cookies.set("accessToken", data.accessToken);
  Cookies.set("refreshToken", data.refreshToken);

  while(Cookies.get("refreshToken") == null) {
    
  }
};

export const getAccessToken = () => {
  const accessToken = Cookies.get("accessToken");
  return accessToken || null;
};

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

export const removeFromStorage = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");

  localStorage.removeItem("user");
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data);
  localStorage.setItem("user", JSON.stringify(data.user));
};

export function saveToStoragePromise(data: IAuthResponse) {
  return new Promise<void>((resolve, reject) => {
    try {
      saveTokensStorage(data);
      localStorage.setItem("user", JSON.stringify(data.user));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}