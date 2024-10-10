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
                body: arg,
            }),
        }),
        minOrderCostGet: build.query<
            MinOrderCostGetApiResponse,
            MinOrderCostGetApiArg
        >({
            query: (arg) => ({
                url: `/min-order-cost`,
                method: "GET",
            }),
        }),
    }),
    overrideExisting: false,
});

export { injectedRtkApi as MinOrderCostApi };

export type MinOrderCostCreateApiResponse = MinOrderCost
export type MinOrderCostCreateApiArg = {
    value: number,
}
export type MinOrderCostGetApiResponse = MinOrderCost
export type MinOrderCostGetApiArg = void;

export type MinOrderCost = {
    value: number,
}
