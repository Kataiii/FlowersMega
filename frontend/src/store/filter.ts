import { emptyApi as api } from "./emptyApi";
import { ItemFilter } from "./product";
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
      invalidatesTags: ['Filter', 'Tag'],
    }),
    filtersControllerGetAll: build.query<
      FiltersControllerGetAllApiResponse,
      FiltersControllerGetAllApiArg
    >({
      query: () => ({ url: `/filters` }),
      providesTags: ['Filter', 'Tag'],
    }),
    filtersControllerGetById: build.query<
      FiltersControllerGetByIdApiResponse,
      FiltersControllerGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/filters/${queryArg.id}` }),
      providesTags: ['Filter', 'Tag'],
    }),
    filtersControllerGetAllWithMaxPrice: build.query<
      FiltersControllerHetAllWithMaxPriceApiResponse,
      FiltersControllerHetAllWithMaxPriceApiArg
    >({
      query: () => ({
        url: `/filters/filters-with-price`
      })
    }),
    filtersControllerDeleteById: build.mutation<
      FiltersControllerDeleteByIdApiResponse,
      FiltersControllerDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/filters/`,
        method: "DELETE",
        body: { id: queryArg.id },
      }),
      invalidatesTags: ['Filter', 'Tag'],

    })
  }),
  overrideExisting: false,
});
export { injectedRtkApi as filterApi };
export type FiltersControllerCreateApiResponse = /** status 201  */ Filter;
export type FiltersControllerCreateApiArg = {
  createFilterDto: CreateFilterDto;
};
export type FiltersControllerGetAllApiResponse = /** status 200  */ FilterWithItems[];
export type FiltersControllerGetAllApiArg = void;
export type FiltersControllerGetByIdApiResponse = /** status 200  */ City;
export type FiltersControllerGetByIdApiArg = {
  id: number;
};
export type FiltersControllerHetAllWithMaxPriceApiResponse = {
  maxPrice: number;
  filters: FilterWithItems[];
}
export type FiltersControllerHetAllWithMaxPriceApiArg = {
  idCategory: number;
};
export type FiltersControllerDeleteByIdApiResponse = void;
export type FiltersControllerDeleteByIdApiArg = {
  id: number;
}
export type Filter = {
  /** Unique identifier */
  id?: number;
  /** Name */
  name: string;
};
export type FilterWithItems = {
  /** Unique identifier */
  id?: number;
  /** Name */
  name: string;
  items: ItemFilter[];
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
  useFiltersControllerGetAllWithMaxPriceQuery,
  useFiltersControllerDeleteByIdMutation,
} = injectedRtkApi;
