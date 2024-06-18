import { emptyApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    citiesControllerGetAll: build.query<
      CitiesControllerGetAllApiResponse,
      CitiesControllerGetAllApiArg
    >({
      query: () => ({ url: `/cities` }),
    }),
    citiesControllerGetById: build.query<
      CitiesControllerGetByIdApiResponse,
      CitiesControllerGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/cities/${queryArg.id}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type CitiesControllerGetAllApiResponse = /** status 200  */ City[];
export type CitiesControllerGetAllApiArg = void;
export type CitiesControllerGetByIdApiResponse = /** status 200  */ City;
export type CitiesControllerGetByIdApiArg = {
  id: number;
};
export type City = {
  /** Unique identifier */
  id?: number;
  /** Name */
  name: string;
};
export const {
  useCitiesControllerGetAllQuery,
  useCitiesControllerGetByIdQuery,
} = injectedRtkApi;
