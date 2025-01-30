import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from './store';
import { API_URL } from '../shared/utils/constants';
import { refreshToken } from '../entities/credential/redux/slice';
import axios from 'axios';

let isRetry = false;

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).credentialReducer.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
  },

  headers: {
    'content-type': 'application/json',
  }, credentials: "include"
});

const baseQueryWithInterceptors = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if(result.error && result.error.status === 401 && !isRetry){
    console.log("result in error");
    try {
      console.log("result in refresh token");
      const responseRefreshToken = (await axios.post(`${API_URL}/auth/refresh`, {}, {
          withCredentials: true
      })).data;
      if (responseRefreshToken.error) throw new Error('Failed to refresh token');
      await api.dispatch(refreshToken(responseRefreshToken));
      console.log("result in refresh token ", responseRefreshToken);
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
    
    isRetry = true;
  }
  else {
    isRetry = false;
  }
  return result;
};

export const emptyApi = createApi({
  baseQuery: baseQueryWithInterceptors,
  tagTypes: ['Review', 'Category', 'Filter', "Tag", "ReviewUPD", "ReviewDEL", "Sizes", "Products", "MinCost", "ExtraPrice", "PaginationAdminProd", "CreateProduct", "UpdateProd", "DeleteProduct"],
  endpoints: () => ({}),
})