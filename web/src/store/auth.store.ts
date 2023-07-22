import { ITokens } from '../api/auth/types/user.interface';
import { create } from 'zustand';
import { getAccessToken } from '../api/auth/auth.helper';
import { instance } from "../api/api.interceptor";
import { URL } from "../constants/urls";

interface IAuthState {
    isAuth: boolean;
    checkAuth: () => Promise<boolean>;
    setAuth: (value: boolean) => void;
}

export const useAuthStore = create<IAuthState>((set, get) => ({
  isAuth: false,
  async checkAuth() {
    set({
      isAuth: await chechRefreshToken()
    });
    console.log('get(): ', get().isAuth);
    return get().isAuth;
  },
  setAuth(value: boolean) {
    set({
      isAuth: value
    }) 
  }
}))


async function chechRefreshToken() {
    const accessToken = getAccessToken();
    if(accessToken === null) {
      return false; 
    }
    const response = await instance.post<string, { data: ITokens, status: Number }>(
      URL.Access_Token, 
      {'refreshToken': accessToken}, 
      {headers: {"Authorization": `Bearer ${accessToken}`}}
    ); 
      
    if(response.status !== 200){
      return false;
    }
        
    return true;
}