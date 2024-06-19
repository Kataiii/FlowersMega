import { emptyApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    filtersControllerCreate: build.mutation<
      FiltersControllerCreateApiResponse,
      FiltersControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/filters`,
        method: "POST",
        body: queryArg.createFilterDto,
      }),
    }),
    filtersControllerGetAll: build.query<
      FiltersControllerGetAllApiResponse,
      FiltersControllerGetAllApiArg
    >({
      query: () => ({ url: `/filters` }),
    }),
    filtersControllerGetById: build.query<
      FiltersControllerGetByIdApiResponse,
      FiltersControllerGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/filters/${queryArg.id}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as filterApi };
export type FiltersControllerCreateApiResponse = /** status 201  */ Filter;
export type FiltersControllerCreateApiArg = {
  createFilterDto: CreateFilterDto;
};
export type FiltersControllerGetAllApiResponse = /** status 200  */ Filter[];
export type FiltersControllerGetAllApiArg = void;
export type FiltersControllerGetByIdApiResponse = /** status 200  */ City;
export type FiltersControllerGetByIdApiArg = {
  id: number;
};
export type Filter = {
  /** Unique identifier */
  id?: number;
  /** Name */
  name: string;
};
export type CreateFilterDto = {
  /** Name filter */
  name: string;
};
export type City = {
  /** Unique identifier */
  id?: number;
  /** Name */
  name: string;
};
export const {
  useFiltersControllerCreateMutation,
  useFiltersControllerGetAllQuery,
  useFiltersControllerGetByIdQuery,
} = injectedRtkApi;
