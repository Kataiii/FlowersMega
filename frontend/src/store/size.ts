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
      // invalidatesTags: ["Sizes"],
    }),
    sizesControllerGetAll: build.query<
      SizesControllerGetAllApiResponse,
      SizesControllerGetAllApiArg
    >({
      query: () => ({ url: `/sizes` }),
      // providesTags: ["Sizes"],
    }),
    sizeContollerGetByName: build.query<
      SizeContollerGetByNameApiResponse,
      SizeControllerGetByNameApiArg
    >({
      query: (queryArg) => ({ url: `/sizes/name/${queryArg.name}` })
    }),
    sizesControllerGetById: build.query<
      SizesControllerGetByIdApiResponse,
      SizesControllerGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/sizes/${queryArg.id}` }),
    }),
    sizesControllerDelete: build.mutation<
      SizesControllerDeleteApiResponse,
      SizesControllerDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/sizes/`,
        method: "DELETE",
        body: { id: queryArg.id }
      }),
      // invalidatesTags: ["Sizes"],
    }),
    productsSizesControllerCreate: build.mutation<
      ProductsSizesControllerCreateApiResponse,
      ProductsSizesControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/products-sizes`,
        method: "POST",
        body: queryArg.createProductSizeDto,
      }),
    }),
    productsSizesControllerGetAll: build.query<
      ProductsSizesControllerGetAllApiResponse,
      ProductsSizesControllerGetAllApiArg
    >({
      query: () => ({ url: `/products-sizes` }),
    }),
    productsSizesControllerGetPagination: build.query<
      ProductsSizesControllerGetPaginationApiResponse,
      ProductsSizesControllerGetPaginationApiArg
    >({
      query: (queryArg) => ({
        url: `/products-sizes/pagination/${queryArg.page}/${queryArg.limit}`,
      }),
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
    productsSizesControllerGetProductSizeForCardById: build.query<
      ProductsSizesControllerGetProductSizeForCardByIdApiResponse,
      ProductsSizesControllerGetProductSizeForCardByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/products-sizes/full-product/${queryArg.id}`,
      }),
    }),
    productsSizesControllerGetByCategotyIdWithPagination: build.query<
      ProductsSizesControllerGetByCategotyIdWithPaginationApiResponse,
      ProductsSizesControllerGetByCategotyIdWithPaginationApiArg
    >({
      query: (queryArg) => ({
        url: `/products-sizes/full-products-cards/${queryArg.page}/${queryArg.limit}`,
      }),
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
export type ProductsSizesControllerCreateApiArg = {
  createProductSizeDto: CreateProductSizeDto;
};
export type ProductsSizesControllerGetAllApiResponse =
  /** status 200  */ ProductSize[];
export type ProductsSizesControllerGetAllApiArg = void;
export type ProductsSizesControllerGetPaginationApiResponse =
  /** status 200  */ GetPaginationProductSizeDto;
export type ProductsSizesControllerGetPaginationApiArg = {
  page: number;
  limit: number;
};
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
export type ProductsSizesControllerGetProductSizeForCardByIdApiResponse =
  /** status 200  */ FullProductSizeDto;
export type ProductsSizesControllerGetProductSizeForCardByIdApiArg = {
  id: number;
};
export type ProductsSizesControllerGetByCategotyIdWithPaginationApiResponse =
  /** status 200  */ FullProductSizeDto[];
export type ProductsSizesControllerGetByCategotyIdWithPaginationApiArg = {
  page: number;
  limit: number;
};
export type OrdersProductsSizesControllerGetByIdApiResponse =
  /** status 200  */ OrderProductSize[];
export type OrdersProductsSizesControllerGetByIdApiArg = {
  id: number;
};
export type SizesControllerDeleteApiResponse = void;
export type SizesControllerDeleteApiArg = {
  id: number;
}

export type SizeContollerGetByNameApiResponse = number;
export type SizeControllerGetByNameApiArg = {
  name: string;
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
export type CreateProductSizeDto = {
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
export type GetPaginationProductSizeDto = {
  /** Count all products */
  count: number;
  /** Products with pagination */
  productsSizes: ProductSize[];
};
export type Image = {
  /** Unique identifier */
  id?: number;
  /** Url to image */
  url: string;
  /** Unique identifier product */
  idProduct?: number;
};
export type ItemFilter = {
  /** Unique identifier */
  id?: number;
  /** Name */
  name: string;
  /** Unique identifie filter */
  idFilter?: number;
};
export type Category = {
  /** Unique identifier */
  id?: number;
  /** Name */
  name: string;
  /** url preview */
  url?: string;
};
export type ProductCardInfoDto = {
  /** Name product */
  name: string;
  /** Unique identifier type product */
  idTypeProduct: number;
  /** Image preview product */
  image: Image;
  /** Array of tags filters */
  filters: ItemFilter[];
  /** Array of categories */
  categories: Category[];
};
export type StaticticReviews = {
  /** Count reviews */
  count: number;
  /** Average rating */
  averageRating: number;
};
export type FullProductSizeDto = {
  /** Product size */
  productSize: ProductSize;
  /** Size */
  size: Size;
  /** Product info for card */
  product: ProductCardInfoDto;
  /** Statistics reviews */
  reviewsInfo?: StaticticReviews;
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
  useProductsSizesControllerGetPaginationQuery,
  useProductsSizesControllerGetByIdQuery,
  useProductsSizesControllerGetByProductIdQuery,
  useProductsSizesControllerGetProductSizeForCardByIdQuery,
  useProductsSizesControllerGetByCategotyIdWithPaginationQuery,
  useOrdersProductsSizesControllerGetByIdQuery,
  useSizesControllerDeleteMutation,
  useSizeContollerGetByNameQuery
} = injectedRtkApi;
