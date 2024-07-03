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
    citiesControllerGetByName: build.query<
      CitiesControllerGetByNameApiResponse,
      CitiesControllerGetByNameApiArg
    >({
      query: (queryArg) => ({ url: `/cities/name/${queryArg.name}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as cityApi };
export type CitiesControllerGetAllApiResponse = /** status 200  */ City[];
export type CitiesControllerGetAllApiArg = void;
export type CitiesControllerGetByIdApiResponse = /** status 200  */ City;
export type CitiesControllerGetByIdApiArg = {
  id: number;
};
export type CitiesControllerGetByNameApiResponse = /** status 200  */ City;
export type CitiesControllerGetByNameApiArg = {
  name: string;
};
export type City = {
  /** Unique identifier */
  id: number;
  /** Name */
  name: string;
};
export const {
  useCitiesControllerGetAllQuery,
  useCitiesControllerGetByIdQuery,
  useCitiesControllerGetByNameQuery,
} = injectedRtkApi;
