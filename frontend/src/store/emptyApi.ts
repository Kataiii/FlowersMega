import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from './store';

export const emptyApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' ,
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).credentialReducer.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
  },
  headers: {
    'content-type': 'application/json',
  }, credentials: "include"}),
  endpoints: () => ({}),
})