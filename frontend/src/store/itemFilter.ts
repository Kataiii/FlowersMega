import { emptyApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    itemFilterControllerCreate: build.mutation<
      ItemFilterControllerCreateApiResponse,
      ItemFilterControllerCreateApiArg
    >({
      query: (arg) => ({
        url: `/items-filter/`,
        method: "POST",
        body: arg,
      }),
      invalidatesTags: ["Tag", "Filter"],
    }),
    itemFilterControllerGetAll: build.query<
      ItemFilterControllerGetAllApiResponse,
      ItemFilterControllerGetAllApiArg
    >({
      query: () => ({ url: `/items-filter/` }),
      providesTags: ['Filter', 'Tag'],
    }),
    itemFilterControllerDelete: build.mutation<
      ItemFilterControllerDeleteApiResponse,
      ItemFilterControllerDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/items-filter/`,
        method: "DELETE",
        body: { id: queryArg.id }
      }),
      invalidatesTags: ["Tag", "Filter"],

    })
  }),
  overrideExisting: false,
});
export { injectedRtkApi as itemFilterApi };
export type ItemFilterControllerCreateApiResponse = ItemFilter
export type ItemFilterControllerCreateApiArg = {
  name: string;
  idFilter: number;
}
export type ItemFilterControllerDeleteApiResponse = ItemFilter
export type ItemFilterControllerDeleteApiArg = {
  id: number;
}
export type ItemFilterControllerGetAllApiResponse = ItemFilter[]
export type ItemFilterControllerGetAllApiArg = void
export type ItemFilter = {
  /** Unique identifier */
  id?: number;
  /** Name */
  name: string;
  /** Unique identifie filter */
  idFilter?: number;
};
export const {
  useItemFilterControllerCreateMutation,
  useItemFilterControllerDeleteMutation,
  useItemFilterControllerGetAllQuery
} = injectedRtkApi;
