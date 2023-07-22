import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, getUserFromStorage } from "../api/auth/auth.helper";
import { instance } from "../api/api.interceptor";
import { URL } from "../constants/urls";
import { ITokens } from "../api/auth/types/user.interface";
import { getContentType, errorCatch } from '../api/api.helper';

// import authService from "../api/auth/auth.api";

function withAuth(WrappedComponent: React.ComponentType) {

  async function WithAuth(props: any) {
    const navigate = useNavigate();
    const message = 'lox';

    useEffect(() => {
      const user = getUserFromStorage();
      if (!user) {
        // User is not authenticated, redirect to login page
        navigate("/auth");
      }
      // console.log(localStorage.getItem("accessToken"));

      // chechRefreshToken();
      
      console.log(user);
    
    }, [navigate]);

     return <WrappedComponent {...props} />
 
    // return 
    //   // <>
    //   //  {message && <div>{message}</div>}
    //     <WrappedComponent {...props} />
    //   // </>
    
  }


  async function chechRefreshToken() {
    const accessToken = getAccessToken();
    if(accessToken === null) {
      return false; 
    }
    const response = await instance.post<string, { data: ITokens }>(
      URL.Access_Token, 
      {'refreshToken': accessToken}, 
      {headers: {"Authorization": `Bearer ${accessToken}`}}
    ); 
      console.log('ALOOOO' ,response)
    return true;
  }

  return WithAuth;
}

export default withAuth;
