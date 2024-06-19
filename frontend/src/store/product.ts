import { emptyApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    productsControllerCreate: build.mutation<
      ProductsControllerCreateApiResponse,
      ProductsControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/products`,
        method: "POST",
        body: queryArg.createProductDto,
      }),
    }),
    productsControllerGetAll: build.query<
      ProductsControllerGetAllApiResponse,
      ProductsControllerGetAllApiArg
    >({
      query: () => ({ url: `/products` }),
    }),
    productsControllerGetById: build.query<
      ProductsControllerGetByIdApiResponse,
      ProductsControllerGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/products/${queryArg.id}` }),
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
    reviewsControllerGetByProductSizeId: build.query<
      ReviewsControllerGetByProductSizeIdApiResponse,
      ReviewsControllerGetByProductSizeIdApiArg
    >({
      query: (queryArg) => ({ url: `/reviews/product/${queryArg.id}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as productApi };
export type ProductsControllerCreateApiResponse = /** status 201  */ Product;
export type ProductsControllerCreateApiArg = {
  createProductDto: CreateProductDto;
};
export type ProductsControllerGetAllApiResponse = /** status 200  */ Product[];
export type ProductsControllerGetAllApiArg = void;
export type ProductsControllerGetByIdApiResponse = /** status 200  */ Product;
export type ProductsControllerGetByIdApiArg = {
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
export type ReviewsControllerGetByProductSizeIdApiResponse =
  /** status 200  */ Review[];
export type ReviewsControllerGetByProductSizeIdApiArg = {
  id: number;
};
export type Product = {
  /** Unique identifier */
  id?: number;
  /** Name product */
  name: string;
  /** Description product */
  description: string;
  /** Unique identifier type product */
  idTypeProduct: number;
};
export type CreateProductDto = {
  /** Name product */
  name: string;
  /** Description product */
  description: string;
  /** Images files for product */
  images: any[];
  /** Unique identifier type product */
  idTypeProduct: number;
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
export type Review = {
  /** Unique identifier */
  id?: number;
  /** Rating of product */
  rating: number;
  /** Comment of product */
  comment?: string;
  /** Unique identifier user */
  idUser?: number;
  /** Unique identifier product size */
  idProductSize: number;
};
export const {
  useProductsControllerCreateMutation,
  useProductsControllerGetAllQuery,
  useProductsControllerGetByIdQuery,
  useProductsSizesControllerCreateMutation,
  useProductsSizesControllerGetAllQuery,
  useProductsSizesControllerGetByIdQuery,
  useProductsSizesControllerGetByProductIdQuery,
  useOrdersProductsSizesControllerGetByIdQuery,
  useReviewsControllerGetByProductSizeIdQuery,
} = injectedRtkApi;
