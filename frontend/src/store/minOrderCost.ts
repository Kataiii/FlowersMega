import { emptyApi as api } from "./emptyApi";

const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        minOrderCostCreat: build.mutation<
            MinOrderCostCreateApiResponse,
            MinOrderCostCreateApiArg
        >({
            query: (arg) => ({
                url: `/min-order-cost`,
                method: "POST",
                body: arg.createMinOrderCosrDto,
            }),
            invalidatesTags: ['MinCost'],
        }),
        minOrderCostGet: build.query<
            MinOrderCostGetApiResponse,
            MinOrderCostGetApiArg
        >({
            query: () => ({
                url: `/min-order-cost`,
                method: "GET",
            }),
            providesTags: ['MinCost'],
        }),
    }),
    overrideExisting: false,
});

export { injectedRtkApi as MinOrderCostApi };

export type MinOrderCostCreateApiResponse = MinOrderCost
export type MinOrderCostCreateApiArg = {
    createMinOrderCosrDto: CreateMinOrderCosrDto,
}
export type MinOrderCostGetApiResponse = MinOrderCost[]
export type MinOrderCostGetApiArg = void;

export type MinOrderCost = {
    value: number,
}

export type CreateMinOrderCosrDto = {
    value: number,
}

export const {
    useMinOrderCostCreatMutation,
    useMinOrderCostGetQuery,
} = injectedRtkApi;