import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const emptyApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' , headers: {
    'content-type': 'application/json',
  }, credentials: "include"}),
  endpoints: () => ({}),
})