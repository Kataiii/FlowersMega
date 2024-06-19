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
        body: queryArg.createReviewDto,
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
  }),
  overrideExisting: false,
});
export { injectedRtkApi as reviewApi };
export type ReviewsControllerCreateApiResponse = /** status 201  */ Review;
export type ReviewsControllerCreateApiArg = {
  createReviewDto: CreateReviewDto;
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
export type CreateReviewDto = {
  /** Rating of product */
  rating: number;
  /** Comment of product */
  comment?: string;
  /** Unique identifier user */
  idUser?: number;
  /** Unique identifier product size */
  idProductSize: number;
  /** Images files for reviews */
  images?: any[];
};
export const {
  useReviewsControllerCreateMutation,
  useReviewsControllerGetAllQuery,
  useReviewsControllerGetByIdQuery,
  useReviewsControllerGetByProductSizeIdQuery,
} = injectedRtkApi;
