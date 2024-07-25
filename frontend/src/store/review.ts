import { emptyApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    reviewsControllerCreate: build.mutation<
      ReviewsControllerCreateApiResponse,
      ReviewsControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/reviews`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reviewsControllerGetAll: build.query<
      ReviewsControllerGetAllApiResponse,
      ReviewsControllerGetAllApiArg
    >({
      query: () => ({ url: `/reviews` }),
    }),
    reviewsControllerGetById: build.query<
      ReviewsControllerGetByIdApiResponse,
      ReviewsControllerGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/reviews/${queryArg.id}` }),
    }),
    reviewsControllerGetByProductSizeId: build.query<
      ReviewsControllerGetByProductSizeIdApiResponse,
      ReviewsControllerGetByProductSizeIdApiArg
    >({
      query: (queryArg) => ({ url: `/reviews/product/${queryArg.id}` }),
    }),
    reviewsControllerGetAllWithPagination: build.query<
      ReviewsControllerGetAllWithPaginationApiResponse,
      ReviewsControllerGetAllWithPaginationApiArg
    >({
      query: (queryArg) => ({
        url: `/reviews/pagination/${queryArg.page}/${queryArg.limit}`,
      }),
    }),
    reviewsControllerGetStaticticByProductSizeId: build.query<
      ReviewsControllerGetStaticticByProductSizeIdApiResponse,
      ReviewsControllerGetStaticticByProductSizeIdApiArg
    >({
      query: (queryArg) => ({ url: `/reviews/statistic/${queryArg.id}` }),
    }),
    reviewsProductSizeControllerGetByProductId: build.query<
      ReviewsProductSizeControllerGetByProductIdApiResponse,
      ReviewsProductSizeControllerGetByProductIdApiArg
    >({
      query: (queryArg) => ({
        url: `/reviews/reviews-product-size/${queryArg.productSizeId}/${queryArg.limit}/${queryArg.page}`
      })
    })
  }),
  overrideExisting: false,
});
export { injectedRtkApi as reviewApi };
export type ReviewsControllerCreateApiResponse = /** status 201  */ Review;
export type ReviewsControllerCreateApiArg = {
  body: {
    rating?: number;
    comment?: string;
    idUser?: number;
    idProductSize?: number;
    phone: string;
    firstname?: string;
    files?: Blob[];
  };
};
export type ReviewsControllerGetAllApiResponse = /** status 200  */ Review[];
export type ReviewsControllerGetAllApiArg = void;
export type ReviewsControllerGetByIdApiResponse = /** status 200  */ Review;
export type ReviewsControllerGetByIdApiArg = {
  id: number;
};
export type ReviewsControllerGetByProductSizeIdApiResponse =
  /** status 200  */ Review[];
export type ReviewsControllerGetByProductSizeIdApiArg = {
  id: number;
};
export type ReviewsControllerGetAllWithPaginationApiResponse =
  /** status 200  */ GetPaginationFullReviewDto;
export type ReviewsControllerGetAllWithPaginationApiArg = {
  page: number;
  limit: number;
};
export type ReviewsProductSizeControllerGetByProductIdApiResponse = {
  count: number;
  averageRating: number;
  reviews: FullReviewDto[];
}
export type ReviewsProductSizeControllerGetByProductIdApiArg = {
  productSizeId: number;
  limit: number;
  page: number;
}
export type ReviewsControllerGetStaticticByProductSizeIdApiResponse =
  /** status 200  */ StaticticReviews;
export type ReviewsControllerGetStaticticByProductSizeIdApiArg = {
  id: number;
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
export type ImageReview = {
  /** Unique identifier */
  id?: number;
  /** Url to image */
  url: string;
  /** Unique identifier review */
  idReview?: number;
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
export type FullReviewDto = {
  /** Unique identifier */
  id: number;
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
  /** Create date */
  createdAt: string;
  /** Update date */
  updatedAt: string;
  /** Update date */
  images: ImageReview[];
  /** Product */
  product: Product;
};
export type GetPaginationFullReviewDto = {
  /** Count all reviews */
  count: number;
  /** Reviews with pagination */
  reviews: FullReviewDto[];
};
export type StaticticReviews = {
  /** Count reviews */
  count: number;
  /** Average rating */
  averageRating: number;
};
export const {
  useReviewsControllerCreateMutation,
  useReviewsControllerGetAllQuery,
  useReviewsControllerGetByIdQuery,
  useReviewsControllerGetByProductSizeIdQuery,
  useReviewsControllerGetAllWithPaginationQuery,
  useReviewsControllerGetStaticticByProductSizeIdQuery,
  useReviewsProductSizeControllerGetByProductIdQuery,
} = injectedRtkApi;
