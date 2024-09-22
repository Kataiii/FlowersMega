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
        body: queryArg.body,
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
    reviewsControllerGetByProductSizeId: build.query<
      ReviewsControllerGetByProductSizeIdApiResponse,
      ReviewsControllerGetByProductSizeIdApiArg
    >({
      query: (queryArg) => ({ url: `/reviews/product/${queryArg.id}` }),
    }),
    reviewsControllerGetStaticticByProductSizeId: build.query<
      ReviewsControllerGetStaticticByProductSizeIdApiResponse,
      ReviewsControllerGetStaticticByProductSizeIdApiArg
    >({
      query: (queryArg) => ({ url: `/reviews/statistic/${queryArg.id}` }),
    }),
    ordersProductsSizesControllerGetById: build.query<
      OrdersProductsSizesControllerGetByIdApiResponse,
      OrdersProductsSizesControllerGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/orders-products-sizes/order/${queryArg.id}`,
      }),
    }),
    categoriesProductsControllerGetAll: build.query<
      CategoriesProductsControllerGetAllApiResponse,
      CategoriesProductsControllerGetAllApiArg
    >({
      query: (queryArg) => ({
        url: `/categories-products/count/${queryArg.id}`,
      }),
    }),
    productsSizesControllerGetAllSizesByProductId: build.query<
      ProductsSizesControllerGetAllSizesByProductIdApiResponse,
      ProductsSizesControllerGetAllSizesByProductIdApiArg
    >({
      query: (queryArg) => ({
        url: `/products-sizes/all-sizes/${queryArg.id}`
      })
    }),
    productsSizesControllerGetByProductIdAndSizeId: build.query<
      ProductsSizesControllerGetByProductIdAndSizeIdApiResponse,
      ProductsSizesControllerGetByProductIdAndSizeIdApiArg
    >({
      query: (queryArg) => ({
        url: `/products-sizes/product-size/${queryArg.idProduct}/${queryArg.idSize}`
      })
    }),
    productSizesControllerGetProductsWithPagination: build.query<
      productSizesControllerGetProductsWithPaginationApiResponse,
      productSizesControllerGetProductsWithPaginationApiArg
    >({
      query: (queryArg) => {
        const params: Record<string, any> = {};
        if (queryArg.search) {
          params.search = queryArg.search;
        }
        return {
          url: `/products-sizes/products-with-pagination/${queryArg.page}/${queryArg.limit}`,
          params: params,
        }

      }

    }),
    productsControllerCreateWithDetails: build.mutation<
      ProductsControllerCreateWithDetailsApiResponse,
      ProductsControllerCreateWithDetailsApiArg
    >({
      query: (queryArg) => ({
        url: `/products-sizes/full-product`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as productApi };
export type ProductsControllerCreateApiResponse = /** status 201  */ Product;
export type ProductsControllerCreateApiArg = {
  body: {
    name?: string;
    description?: string;
    idTypeProduct?: number;
    files?: Blob[];
  };
};
export type ProductsControllerGetAllApiResponse = /** status 200  */ Product[];
export type ProductsControllerGetAllApiArg = void;
export type ProductsControllerGetByIdApiResponse = /** status 200  */ Product;
export type ProductsControllerGetByIdApiArg = {
  id: number;
};
export type ProductsSizesControllerCreateApiResponse =
  /** status 201  */ ProductSize;
export type ProductsSizesControllerCreateApiArg = {
  createProductSizeDto: CreateProductSizeDto;
};
export type ProductsSizesControllerGetAllSizesByProductIdApiResponse = {
  productsSizes: ProductSize[];
  sizes: Size[];
}
export type ProductsSizesControllerGetAllSizesByProductIdApiArg = {
  id: number;
}
export type ProductsSizesControllerGetByProductIdAndSizeIdApiResponse = ProductSize;
export type ProductsSizesControllerGetByProductIdAndSizeIdApiArg = {
  idProduct: number;
  idSize: number;
}
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
export type ProductsSizesControllerGetByCategotyIdWithPaginationApiResponse = {
  count: number;
  products: FullProductSizeDto[];
}
/** status 200  */
export type ProductsSizesControllerGetByCategotyIdWithPaginationApiArg = {
  page: number;
  limit: number;
};
export type ReviewsControllerGetByProductSizeIdApiResponse =
  /** status 200  */ Review[];
export type ReviewsControllerGetByProductSizeIdApiArg = {
  id: number;
};
export type ReviewsControllerGetStaticticByProductSizeIdApiResponse =
  /** status 200  */ StaticticReviews;
export type ReviewsControllerGetStaticticByProductSizeIdApiArg = {
  id: number;
};
export type OrdersProductsSizesControllerGetByIdApiResponse =
  /** status 200  */ OrderProductSize[];
export type OrdersProductsSizesControllerGetByIdApiArg = {
  id: number;
};
export type CategoriesProductsControllerGetAllApiResponse =
  /** status 200  */ Number;
export type CategoriesProductsControllerGetAllApiArg = {
  id: number;
};
export type productSizesControllerGetProductsWithPaginationApiResponse = {
  count: number;
  products: ProductWithSizes[];
}
export type productSizesControllerGetProductsWithPaginationApiArg = {
  page: number;
  limit: number;
  search?: string;
}
export type ProductsControllerCreateWithDetailsApiResponse = /** status 201 */ Product;
export type ProductsControllerCreateWithDetailsApiArg = {
  body: {
    name: string;
    type: number;
    description: string;
    structure: string;
    photo: string;
    productSize: {
      idSize: number;
      prise: number;
      paramsSize: string;
    }[];
    categories: {
      id: number;
      name: string;
      photo: string;
    }[];
    filters: {
      filter: {
        id: number;
        name: string;
      };
      tags: {
        id: number;
        name: string;
        idFilter: number;
      }[];
    }[];
  };
};
export type Product = {
  /** Unique identifier */
  id: number;
  /** Name product */
  name: string;
  /** Description product */
  description?: string;
  /** Structure product */
  structure: string;
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
export type Size = {
  /** Unique identifier */
  id?: number;
  /** Name */
  name: string;
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
export type Review = {
  /** Unique identifier */
  id?: number;
  /** Rating of product */
  rating: number;
  /** Comment of product */
  comment?: string;
  /** Unique identifier user */
  idUser?: number;
  /** Name user */
  firstname?: string;
  /** Unique identifier product size */
  idProductSize: number;
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
export type ProductSizeInfo = {

  productSize: ProductSize;

  size: Size;
};
export type ProductWithSizes = {

  products: Product;

  productsSizes: ProductSizeInfo[];
};
export type Number = {};
export const {
  useProductsControllerCreateMutation,
  useProductsControllerGetAllQuery,
  useProductsControllerGetByIdQuery,
  useProductsSizesControllerCreateMutation,
  useProductsSizesControllerGetAllQuery,
  useProductsSizesControllerGetPaginationQuery,
  useProductsSizesControllerGetByIdQuery,
  useProductsSizesControllerGetByProductIdQuery,
  useProductsSizesControllerGetAllSizesByProductIdQuery,
  useProductsSizesControllerGetProductSizeForCardByIdQuery,
  useProductsSizesControllerGetByCategotyIdWithPaginationQuery,
  useReviewsControllerGetByProductSizeIdQuery,
  useReviewsControllerGetStaticticByProductSizeIdQuery,
  useOrdersProductsSizesControllerGetByIdQuery,
  useCategoriesProductsControllerGetAllQuery,
  useProductsSizesControllerGetByProductIdAndSizeIdQuery,
  useProductSizesControllerGetProductsWithPaginationQuery,
  useProductsControllerCreateWithDetailsMutation
} = injectedRtkApi;
