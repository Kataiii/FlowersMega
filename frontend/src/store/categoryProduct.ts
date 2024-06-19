import { emptyApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({}),
  overrideExisting: false,
});
export { injectedRtkApi as categoryProductApi };
export const {} = injectedRtkApi;
