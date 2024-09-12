import { emptyApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    typesProductControllerCreate: build.mutation<
      TypesProductControllerCreateApiResponse,
      TypesProductControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/types-product`,
        method: "POST",
        body: queryArg.createTypeProductDto,
      }),
    }),
    typesProductControllerGetAll: build.query<
      TypesProductControllerGetAllApiResponse,
      TypesProductControllerGetAllArg
    >({
      query: () => ({ url: `/types-product` }),
    }),
    typesProductControllerGetById: build.query<
      TypesProductControllerGetByIdApiResponse,
      TypesProductControllerGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/types-product/${queryArg.id}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as typeProductApi };
export type TypesProductControllerCreateApiResponse = /** status 201  */ TypeProduct;
export type TypesProductControllerCreateApiArg = {
  createTypeProductDto: CreateTypeProductDto;
}
export type TypesProductControllerGetAllApiResponse = /** status 200  */ TypeProduct[]
export type TypesProductControllerGetAllArg = void;
export type TypesProductControllerGetByIdApiResponse = /** status 200  */ TypeProduct;
export type TypesProductControllerGetByIdApiArg = {
  id: number;
};


export type CreateTypeProductDto = {
  name: string;
}
export type TypeProduct = {
  id: number;
  name: string;

}
export const {
  useTypesProductControllerCreateMutation,
  useTypesProductControllerGetAllQuery,
  useTypesProductControllerGetByIdQuery,
} = injectedRtkApi;
