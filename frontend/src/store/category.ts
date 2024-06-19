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
        body: queryArg.createCategoryDto,
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
  }),
  overrideExisting: false,
});
export { injectedRtkApi as categoryApi };
export type CategoriesControllerCreateApiResponse = /** status 201  */ Category;
export type CategoriesControllerCreateApiArg = {
  createCategoryDto: CreateCategoryDto;
};
export type CategoriesControllerGetAllApiResponse =
  /** status 200  */ Category[];
export type CategoriesControllerGetAllApiArg = void;
export type CategoriesControllerGetByIdApiResponse =
  /** status 200  */ Category;
export type CategoriesControllerGetByIdApiArg = {
  id: number;
};
export type Category = {
  /** Unique identifier */
  id?: number;
  /** Name */
  name: string;
};
export type CreateCategoryDto = {
  /** Name category */
  name: string;
};
export const {
  useCategoriesControllerCreateMutation,
  useCategoriesControllerGetAllQuery,
  useCategoriesControllerGetByIdQuery,
} = injectedRtkApi;
