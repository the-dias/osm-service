import axios from "axios";
import { SERVER_URL, URL } from "../../constants/urls";
import Cookies from "js-cookie";
import { getContentType } from "../api.helper";
import { instance } from "../api.interceptor";
import { removeFromStorage, saveToStorage, saveToStoragePromise } from "./auth.helper";
import { IAuthResponse, ILogin, IRegister } from "./types/user.interface";


export const AuthService = {
  async login(data: ILogin) {
    const response = await instance<IAuthResponse>({
      url: URL.Login,
      method: "POST",
      data,
    });
    if(response.request.status !== 200) {
      return response.data;
    }
    if (response.data.accessToken) {
      await saveToStoragePromise(response.data);
      // console.log(Cookies.get("accessToken"));
      // eslint-disable-next-line react-hooks/rules-of-hooks
      // const { setAuth } = useAuthStore();
      // setAuth(true);
    }
    // console.log('response: ', response);
    return response.data;
  },
  async register(data: IRegister) {
    const response = await instance<IAuthResponse>({
      url: URL.Register,
      method: "POST",
      data,
    });
    if(response.request.status !== 200) {
      return response.data;
    }
    if (response.data.accessToken) {
      saveToStorage(response.data);
    }

    return response.data;
  },

  async getNewTokens() {
    const refreshToken = Cookies.get("refresh-token");

    const response = await axios.post<string, { data: IAuthResponse }>(
      SERVER_URL,
      { refreshToken },
      {
        headers: getContentType(),
      }
    );

    if (response.data.accessToken) {
      saveToStorage(response.data);
    }

    return response;
  },

  logout() {
    removeFromStorage();
  }
};

// const authService = {
//   async login(data: Object) {
//     const response = await axios.post(URL.Login, data);
//     const { accessToken, refreshToken, user } = response.data;

//     // Store the tokens and user data in local storage or state
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("refreshToken", refreshToken);
//     localStorage.setItem("user", JSON.stringify(user));

//     console.log("Login success");
//     return response;
//   },

//   async register(data: Object) {
//     return await axios.post(URL.Register, data);
//   },

//   logout() {
//     // Clear the tokens and user data from local storage or state
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("user");
//   },

//   getUser() {
//     // Retrieve the user data from local storage or state
//     const user = localStorage.getItem("user");
//     return user ? JSON.parse(user) : null;
//   },

//   getAccessToken() {
//     // Retrieve the access token from local storage or state
//     return localStorage.getItem("accessToken");
//   },

//   getRefreshToken() {
//     // Retrieve the refresh token from local storage or state
//     return localStorage.getItem("refreshToken");
//   },
// };

// export default authService;
