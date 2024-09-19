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
export type ItemFilter = {
  /** Unique identifier */
  id?: number;
  /** Name */
  name: string;
  /** Unique identifie filter */
  idFilter?: number;
};
export const {
  useItemFilterControllerCreateMutation
} = injectedRtkApi;
