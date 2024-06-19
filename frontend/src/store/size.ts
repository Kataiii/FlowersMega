import { emptyApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    sizesControllerCreate: build.mutation<
      SizesControllerCreateApiResponse,
      SizesControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/sizes`,
        method: "POST",
        body: queryArg.createSizeDto,
      }),
    }),
    sizesControllerGetAll: build.query<
      SizesControllerGetAllApiResponse,
      SizesControllerGetAllApiArg
    >({
      query: () => ({ url: `/sizes` }),
    }),
    sizesControllerGetById: build.query<
      SizesControllerGetByIdApiResponse,
      SizesControllerGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/sizes/${queryArg.id}` }),
    }),
    productsSizesControllerCreate: build.mutation<
      ProductsSizesControllerCreateApiResponse,
      ProductsSizesControllerCreateApiArg
    >({
      query: () => ({ url: `/products-sizes`, method: "POST" }),
    }),
    productsSizesControllerGetAll: build.query<
      ProductsSizesControllerGetAllApiResponse,
      ProductsSizesControllerGetAllApiArg
    >({
      query: () => ({ url: `/products-sizes` }),
    }),
    productsSizesControllerGetById: build.query<
      ProductsSizesControllerGetByIdApiResponse,
      ProductsSizesControllerGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/products-sizes/${queryArg.id}` }),
    }),
    productsSizesControllerGetByProductId: build.query<
      ProductsSizesControllerGetByProductIdApiResponse,
      ProductsSizesControllerGetByProductIdApiArg
    >({
      query: (queryArg) => ({ url: `/products-sizes/product/${queryArg.id}` }),
    }),
    ordersProductsSizesControllerGetById: build.query<
      OrdersProductsSizesControllerGetByIdApiResponse,
      OrdersProductsSizesControllerGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/orders-products-sizes/order/${queryArg.id}`,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as sizeApi };
export type SizesControllerCreateApiResponse = /** status 201  */ Size;
export type SizesControllerCreateApiArg = {
  createSizeDto: CreateSizeDto;
};
export type SizesControllerGetAllApiResponse = /** status 200  */ Size[];
export type SizesControllerGetAllApiArg = void;
export type SizesControllerGetByIdApiResponse = /** status 200  */ Size;
export type SizesControllerGetByIdApiArg = {
  id: number;
};
export type ProductsSizesControllerCreateApiResponse =
  /** status 201  */ ProductSize;
export type ProductsSizesControllerCreateApiArg = void;
export type ProductsSizesControllerGetAllApiResponse =
  /** status 200  */ ProductSize[];
export type ProductsSizesControllerGetAllApiArg = void;
export type ProductsSizesControllerGetByIdApiResponse =
  /** status 200  */ ProductSize;
export type ProductsSizesControllerGetByIdApiArg = {
  id: number;
};
export type ProductsSizesControllerGetByProductIdApiResponse =
  /** status 200  */ ProductSize[];
export type ProductsSizesControllerGetByProductIdApiArg = {
  id: number;
};
export type OrdersProductsSizesControllerGetByIdApiResponse =
  /** status 200  */ OrderProductSize[];
export type OrdersProductsSizesControllerGetByIdApiArg = {
  id: number;
};
export type Size = {
  /** Unique identifier */
  id?: number;
  /** Name */
  name: string;
};
export type CreateSizeDto = {
  /** Name size */
  name: string;
};
export type ProductSize = {
  /** Unique identifier */
  id?: number;
  /** Unique identifier product */
  idProduct: number;
  /** Unique identifier size */
  idSize: number;
  /** Params for size */
  paramsSize: string;
  /** Count of product */
  count?: number;
  /** Prise of product */
  prise: number;
};
export type OrderProductSize = {
  /** Unique identifier */
  id?: number;
  /** Count of products sizes */
  count: number;
  /** Unique identifier product size */
  idProductSize: number;
  /** Unique identifier order */
  idOrder: number;
};
export const {
  useSizesControllerCreateMutation,
  useSizesControllerGetAllQuery,
  useSizesControllerGetByIdQuery,
  useProductsSizesControllerCreateMutation,
  useProductsSizesControllerGetAllQuery,
  useProductsSizesControllerGetByIdQuery,
  useProductsSizesControllerGetByProductIdQuery,
  useOrdersProductsSizesControllerGetByIdQuery,
} = injectedRtkApi;
