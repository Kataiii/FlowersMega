import { emptyApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        extraPriceControllerCreate: build.mutation<
            ExtraPriceControllerCreateApiResponce,
            ExtraPriceControllerCreateApiArg
        >({
            query: (queryArg) => ({
                url: "/extra-price/",
                method: "POST",
                body: queryArg.body,
            })
        }),
        extraPriceControllerDelete: build.mutation<
            ExtraPriceControllerDeleteApiResponce,
            ExtraPriceControllerDeleteApiArg
        >({
            query: (queryArg) => ({
                url: `/extra-price/${queryArg.idCategory}`,
                method: "DELETE",
            }),
            invalidatesTags: ['ExtraPrice']
        }),
        extraPriceControllerGetAll: build.query<
            ExtraPriceControllerGetAllApiResponce,
            ExtraPriceControllerGetAllApiArg
        >({
            query: () => ({
                url: "/extra-price/",
                method: "GET",
            }),
            providesTags: ['ExtraPrice']
        }),
        extraPriveControllerGetByCategoryId: build.query<
            ExtraPriceControllerGetByCategoryIdApiResponce,
            ExtraPriceControllerGetByCategoryIdApiArg
        >({
            query: (queryArg) => ({
                url: `/extra-price/${queryArg.idCategory}`,
                method: "GET",
            }),
            providesTags: ['ExtraPrice']
        })
    })

});
export { injectedRtkApi as extraPriceApi };
export type ExtraPriceControllerCreateApiResponce = ExtraPrice;
export type ExtraPriceControllerCreateApiArg = {
    body: {
        idCategory: string;
        value: number;
    };
};
export type ExtraPriceControllerDeleteApiResponce = ExtraPrice;
export type ExtraPriceControllerDeleteApiArg = {
    idCategory: string;
};
export type ExtraPriceControllerGetAllApiResponce = ExtraPrice[];
export type ExtraPriceControllerGetAllApiArg = void;

export type ExtraPriceControllerGetByCategoryIdApiResponce = ExtraPrice;
export type ExtraPriceControllerGetByCategoryIdApiArg = {
    idCategory: string;
};

export type ExtraPrice = {
    id: number;
    idCategory: string;
    value: number;
}

export const {
    useExtraPriceControllerCreateMutation,
    useExtraPriceControllerDeleteMutation,
    useExtraPriceControllerGetAllQuery,
    useExtraPriveControllerGetByCategoryIdQuery
} = injectedRtkApi;