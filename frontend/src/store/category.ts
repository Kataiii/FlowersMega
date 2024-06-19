import { emptyApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    categoriesControllerCreate: build.mutation<
      CategoriesControllerCreateApiResponse,
      CategoriesControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/categories`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    categoriesControllerGetAll: build.query<
      CategoriesControllerGetAllApiResponse,
      CategoriesControllerGetAllApiArg
    >({
      query: () => ({ url: `/categories` }),
    }),
    categoriesControllerGetById: build.query<
      CategoriesControllerGetByIdApiResponse,
      CategoriesControllerGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/categories/${queryArg.id}` }),
    }),
    categoriesProductsControllerGetAll: build.query<
      CategoriesProductsControllerGetAllApiResponse,
      CategoriesProductsControllerGetAllApiArg
    >({
      query: (queryArg) => ({
        url: `/categories-products/count/${queryArg.id}`,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as categoryApi };
export type CategoriesControllerCreateApiResponse = /** status 201  */ Category;
export type CategoriesControllerCreateApiArg = {
  body: {
    name?: string;
    file?: Blob;
  };
};
export type CategoriesControllerGetAllApiResponse =
  /** status 200  */ Category[];
export type CategoriesControllerGetAllApiArg = void;
export type CategoriesControllerGetByIdApiResponse =
  /** status 200  */ Category;
export type CategoriesControllerGetByIdApiArg = {
  id: number;
};
export type CategoriesProductsControllerGetAllApiResponse =
  /** status 200  */ Number;
export type CategoriesProductsControllerGetAllApiArg = {
  id: number;
};
export type Category = {
  /** Unique identifier */
  id?: number;
  /** Name */
  name: string;
  /** url preview */
  url?: string;
};
export type Number = {};
export const {
  useCategoriesControllerCreateMutation,
  useCategoriesControllerGetAllQuery,
  useCategoriesControllerGetByIdQuery,
  useCategoriesProductsControllerGetAllQuery,
} = injectedRtkApi;
