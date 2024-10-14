import { emptyApi as api } from "./emptyApi";
const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        extraPriceControllerCreate: build.mutation<
            ExtraPriceControllerCreateApiResponce,
            ExtraPriceControllerCreateApiArg
        >({
            query: (queryArg) => ({
                url: "/extra_price/",
                method: "POST",
                body: queryArg.body,
            })
        }),
        extraPriceControllerDelete: build.mutation<
            ExtraPriceControllerDeleteApiResponce,
            ExtraPriceControllerDeleteApiArg
        >({
            query: (queryArg) => ({
                url: `/extra_price/${queryArg.idCategory}`,
                method: "DELETE",
            })
        }),
        extraPriceControllerGetAll: build.query<
            ExtraPriceControllerGetAllApiResponce,
            ExtraPriceControllerGetAllApiArg
        >({
            query: () => ({
                url: "/extra_price/",
                method: "GET",
            })
        }),
        extraPriveControllerGetByCategoryId: build.query<
            ExtraPriceControllerGetByCategoryIdApiResponce,
            ExtraPriceControllerGetByCategoryIdApiArg
        >({
            query: (queryArg) => ({
                url: `/extra_price/${queryArg.idCategory}`,
                method: "GET",
            })

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
export type ExtraPriceControllerDeleteApiResponce = void
export type ExtraPriceControllerDeleteApiArg = {
    idCategory: number;
};
export type ExtraPriceControllerGetAllApiResponce = ExtraPrice[];
export type ExtraPriceControllerGetAllApiArg = void;

export type ExtraPriceControllerGetByCategoryIdApiResponce = ExtraPrice;
export type ExtraPriceControllerGetByCategoryIdApiArg = {
    idCategory: number;
};

export type ExtraPrice = {
    id: number;
    idCategory: string;
    value: number;
}