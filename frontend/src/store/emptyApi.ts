import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from './store';
import { API_URL } from '../shared/utils/constants';

export const emptyApi = createApi({
  baseQuery: fetchBaseQuery({
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
  }),
  tagTypes: ['Review', 'Category', 'Filter', "Tag", "ReviewUPD", "ReviewDEL", "Sizes", "Products", "MinCost", "ExtraPrice", "PaginationAdminProd", "CreateProduct", "UpdateProd"],
  endpoints: () => ({}),
})