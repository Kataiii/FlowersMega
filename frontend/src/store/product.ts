import { emptyApi as api } from "./emptyApi";
import { Order } from "./order";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    productsControllerCreate: build.mutation<
      ProductsControllerCreateApiResponse,
      ProductsControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/products`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    productsControllerGetAll: build.query<
      ProductsControllerGetAllApiResponse,
      ProductsControllerGetAllApiArg
    >({
      query: () => ({ url: `/products` }),
    }),
    productsControllerGetById: build.query<
      ProductsControllerGetByIdApiResponse,
      ProductsControllerGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/products/${queryArg.id}` }),
      providesTags: ["CreateProduct"]
    }),
    productsSizesControllerSearch: build.query<
      ProductsSizesControllerSearchApiResponse,
      ProductsSizesControllerSearchApiArg
    >({
      query: (queryArg) => {
        if (!queryArg || queryArg.trim() === "") {

          return {
            url: `/products-sizes/search`,
            method: "GET",
          };
        }
        return {
          url: `/products-sizes/search/${queryArg}`,
          method: "GET",
        };
      },
    }),
    productsSizesControllerCreate: build.mutation<
      ProductsSizesControllerCreateApiResponse,
      ProductsSizesControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/products-sizes`,
        method: "POST",
        body: queryArg.createProductSizeDto,
      }),
      // invalidatesTags: ['Products']
    }),
    productsSizesControllerGetAll: build.query<
      ProductsSizesControllerGetAllApiResponse,
      ProductsSizesControllerGetAllApiArg
    >({
      query: () => ({ url: `/products-sizes` }),
    }),
    productsSizesControllerGetPagination: build.query<
      ProductsSizesControllerGetPaginationApiResponse,
      ProductsSizesControllerGetPaginationApiArg
    >({
      query: (queryArg) => ({
        url: `/products-sizes/pagination/${queryArg.page}/${queryArg.limit}`,
      }),
    }),
    productsSizesControllerGetById: build.query<
      ProductsSizesControllerGetByIdApiResponse,
      ProductsSizesControllerGetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/products-sizes/${queryArg.id}` }),
      providesTags: ['ExtraPrice']
    }),
    productsSizesControllerGetByProductId: build.query<
      ProductsSizesControllerGetByProductIdApiResponse,
      ProductsSizesControllerGetByProductIdApiArg
    >({
      query: (queryArg) => ({ url: `/products-sizes/product/${queryArg.id}` }),
    }),
    productsSizesControllerGetProductSizeForCardById: build.query<
      ProductsSizesControllerGetProductSizeForCardByIdApiResponse,
      ProductsSizesControllerGetProductSizeForCardByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/products-sizes/full-product/${queryArg.id}`,
      }),
    }),
    productsSizesControllerGetByCategotyIdWithPagination: build.query<
      ProductsSizesControllerGetByCategotyIdWithPaginationApiResponse,
      ProductsSizesControllerGetByCategotyIdWithPaginationApiArg
    >({
      query: (queryArg) => {
        const params: Record<string, any> = {};
        if (queryArg.search) {
          params.search = queryArg.search;
        }
        if (queryArg.filterItems) {
          params.filterItems = queryArg.filterItems;
        }
        if (queryArg.minPrice) {
          params.minPrice = queryArg.minPrice;
        }
        if (queryArg.maxPrice) {
          params.maxPrice = queryArg.maxPrice;
        }
        if (queryArg.category) {
          params.category = queryArg.category;
        }
        console.log(queryArg.search, "HHHHHHHHHHHMMMMMMMMMMMMMMMMMMMMMMMMMM")
        console.log('CATEGORY', queryArg.category);
        console.log('Request params:', queryArg);
        return {
          url: `/products-sizes/full-products-cards/${queryArg.page}/${queryArg.limit}`,
          params: params,
        }
      },
      // providesTags: ['ExtraPrice']
    }),
    reviewsControllerGetByProductSizeId: build.query<
      ReviewsControllerGetByProductSizeIdApiResponse,
      ReviewsControllerGetByProductSizeIdApiArg
    >({
      query: (queryArg) => ({ url: `/reviews/product/${queryArg.id}` }),
    }),
    reviewsControllerGetStaticticByProductSizeId: build.query<
      ReviewsControllerGetStaticticByProductSizeIdApiResponse,
      ReviewsControllerGetStaticticByProductSizeIdApiArg
    >({
      query: (queryArg) => ({ url: `/reviews/statistic/${queryArg.id}` }),
    }),
    ordersProductsSizesControllerGetById: build.query<
      OrdersProductsSizesControllerGetByIdApiResponse,
      OrdersProductsSizesControllerGetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/orders-products-sizes/order/${queryArg.id}`,
      }),
    }),
    categoriesProductsControllerGetAll: build.query<
      CategoriesProductsControllerGetAllApiResponse,
      CategoriesProductsControllerGetAllApiArg
    >({
      query: (queryArg) => ({
        url: `/categories-products/count/${queryArg.id}`,
      }),
    }),
    productsSizesControllerGetAllSizesByProductId: build.query<
      ProductsSizesControllerGetAllSizesByProductIdApiResponse,
      ProductsSizesControllerGetAllSizesByProductIdApiArg
    >({
      query: (queryArg) => ({
        url: `/products-sizes/all-sizes/${queryArg.id}`
      }),
      // providesTags: ['Products']
    }),
    productsSizesControllerGetByProductIdAndSizeId: build.query<
      ProductsSizesControllerGetByProductIdAndSizeIdApiResponse,
      ProductsSizesControllerGetByProductIdAndSizeIdApiArg
    >({
      query: (queryArg) => ({
        url: `/products-sizes/product-size/${queryArg.idProduct}/${queryArg.idSize}`
      })
    }),
    productSizesControllerGetProductsWithPagination: build.query<
      productSizesControllerGetProductsWithPaginationApiResponse,
      productSizesControllerGetProductsWithPaginationApiArg
    >({
      query: (queryArg) => {
        const params: Record<string, any> = {};
        console.log(queryArg.page);
        if (queryArg.search) {
          params.search = queryArg.search;
        }
        if (queryArg.field) {
          params.field = queryArg.field;
        }
        if (queryArg.type) {
          params.type = queryArg.type;
        }
        if (queryArg.categories) {
          params.categories = queryArg.categories;
        }
        if (queryArg.filters) {
          params.filters = queryArg.filters;
        }
        return {
          url: `/products-sizes/products-with-pagination/${queryArg.page}/${queryArg.limit}`,
          params: params,
        }

      },
      providesTags: ['CreateProduct', "DeleteProduct", "ExtraPrice"]
    }),
    productsControllerCreateWithDetails: build.mutation<
      ProductsControllerCreateWithDetailsApiResponse,
      ProductsControllerCreateWithDetailsApiArg
    >({
      query: (queryArg) => ({
        url: `/products-sizes/full-product/update`,
        method: "POST",
        body: queryArg.body,
      }),
      // invalidatesTags: ["PaginationAdminProd"]
      invalidatesTags: ["CreateProduct"]
    }),
    productsControllerDeleteById: build.mutation<
      ProductsControllerDeleteByIdApiResponse,
      ProductsControllerDeleteByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/products-sizes/product/${queryArg.id}`,
        method: "DELETE",

      }),
      invalidatesTags: ["DeleteProduct"]
      // invalidatesTags: ['Products']
    }),
    productsControllerGetProductSizesCount: build.query<
      ProductsControllerGetProductSizesCountApiResponse,
      ProductsControllerGetProductSizesCountApiArg
    >({
      query: (queryArg) => ({
        url: `/products/${queryArg.id}/product-sizes/count`,
        method: "GET",
      }),
      // providesTags: ['Products']
    }),
    categoryControllerGetIdByName: build.query<
      CategoryControllerGetIdByNameApiResponse,
      CategoryControllerGetIdByNameApiArg
    >({
      query: (queryArg) => {
        console.log(queryArg.name, "YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY");
        return {
          url: `/products-sizes/category/${queryArg.name}`,
          method: "GET",
        };

      },
    }),
    productsSizesControllerGetProductsCatalogWithPagination: build.query<
      ProductsSizesControllerGetProductsCatalogWithPaginationApiResponse,
      ProductsSizesControllerGetProductsCatalogWithPaginationApiArg
    >({
      query: (queryArg) => {
        const params: Record<string, any> = {};
        if (queryArg.search) {
          params.search = queryArg.search;
        }
        if (queryArg.filterItems) {
          params.filterItems = queryArg.filterItems;
        }
        if (queryArg.minPrice) {
          params.minPrice = queryArg.minPrice;
        }
        if (queryArg.maxPrice) {
          params.maxPrice = queryArg.maxPrice;
        }
        if (queryArg.category) {
          params.category = queryArg.category;
        }
        return {
          url: `/products-sizes/products-catalog-card/${queryArg.page}/${queryArg.limit}`,
          params: params,
        }
      }
    }),

  }),
  overrideExisting: false,
});
export { injectedRtkApi as productApi };
export type ProductsControllerCreateApiResponse = /** status 201  */ Product;
export type ProductsControllerCreateApiArg = {
  body: {
    name?: string;
    description?: string;
    idTypeProduct?: number;
    files?: Blob[];
  };
};

export type ProductsSizesControllerSearchApiResponse =
  {
    category: Category[],
    products: Product[]
  }
export type ProductsSizesControllerSearchApiArg = string | null;

export type ProductsControllerGetAllApiResponse = /** status 200  */ Product[];
export type ProductsControllerGetAllApiArg = void;
export type ProductsControllerGetByIdApiResponse = /** status 200  */ Product;
export type ProductsControllerGetByIdApiArg = {
  id: number;
};
export type ProductsSizesControllerCreateApiResponse =
  /** status 201  */ ProductSize;
export type ProductsSizesControllerCreateApiArg = {
  createProductSizeDto: CreateProductSizeDto;
};
export type ProductsSizesControllerGetAllSizesByProductIdApiResponse = {
  productsSizes: ProductSize[];
  sizes: Size[];
}
export type ProductsSizesControllerGetAllSizesByProductIdApiArg = {
  id: number;
}
export type ProductsSizesControllerGetByProductIdAndSizeIdApiResponse = ProductSize;
export type ProductsSizesControllerGetByProductIdAndSizeIdApiArg = {
  idProduct: number;
  idSize: number;
}
export type ProductsSizesControllerGetAllApiResponse =
  /** status 200  */ ProductSize[];
export type ProductsSizesControllerGetAllApiArg = void;
export type ProductsSizesControllerGetPaginationApiResponse =
  /** status 200  */ GetPaginationProductSizeDto;
export type ProductsSizesControllerGetPaginationApiArg = {
  page: number;
  limit: number;
};
export type ProductsSizesControllerGetByIdApiResponse =
  /** status 200  */ ProductSize;
export type ProductsSizesControllerGetByIdApiArg = {
  id: number;
};
export type ProductsSizesControllerGetByProductIdApiResponse =
  /** status 200  */ {
  productSizes: {
    id: number;
    idProduct: number;
    idSize: number;
    paramsSize: string;
    count: number;
    prise: number;
    orders: Order[];
  }
  product: Product;
}[];
export type ProductsSizesControllerGetByProductIdApiArg = {
  id: number;
};
export type ProductsSizesControllerGetProductSizeForCardByIdApiResponse =
  /** status 200  */ FullProductSizeDto;
export type ProductsSizesControllerGetProductSizeForCardByIdApiArg = {
  id: number;
};
export type ProductsSizesControllerGetByCategotyIdWithPaginationApiResponse = {
  count: number;
  products: FullProductSizeDto[];
}
/** status 200  */
export type ProductsSizesControllerGetByCategotyIdWithPaginationApiArg = {
  page: number;
  limit: number;
  search?: string;
  filterItems?: number[];
  minPrice?: number;
  maxPrice?: number;
  category?: number;
};
export type ReviewsControllerGetByProductSizeIdApiResponse =
  /** status 200  */ Review[];
export type ReviewsControllerGetByProductSizeIdApiArg = {
  id: number;
};
export type ReviewsControllerGetStaticticByProductSizeIdApiResponse =
  /** status 200  */ StaticticReviews;
export type ReviewsControllerGetStaticticByProductSizeIdApiArg = {
  id: number;
};
export type OrdersProductsSizesControllerGetByIdApiResponse =
  /** status 200  */ OrderProductSize[];
export type OrdersProductsSizesControllerGetByIdApiArg = {
  id: number;
};
export type CategoriesProductsControllerGetAllApiResponse =
  /** status 200  */ Number;
export type CategoriesProductsControllerGetAllApiArg = {
  id: number;
};
export type productSizesControllerGetProductsWithPaginationApiResponse = {
  count: number;
  products: ProductWithSizes[];
}
export type CategoryControllerGetIdByNameApiResponse = {
  id: number;
}
export type CategoryControllerGetIdByNameApiArg = {
  name: string | null;
}
export type productSizesControllerGetProductsWithPaginationApiArg = {
  page: number;
  limit: number;
  search?: string;
  field?: string;
  type?: string;
  categories?: number[];
  filters?: number[];
}
export type ProductsControllerCreateWithDetailsApiResponse = /** status 201 */ void;
export type ProductsControllerCreateWithDetailsApiArg = {
  body: undefined
};

export type ProductsControllerDeleteByIdApiResponse = void;
export type ProductsControllerDeleteByIdApiArg = {
  id: number;
}

export type ProductsControllerGetProductSizesCountApiResponse = {
  count: number;
};
export type ProductsControllerGetProductSizesCountApiArg = {
  id: number;
}

export type ProductsSizesControllerGetProductsCatalogWithPaginationApiArg = {
  page: number;
  limit: number;
  search?: string;
  filterItems?: number[];
  minPrice?: number;
  maxPrice?: number;
  category?: number;
}

export type ProductsSizesControllerGetProductsCatalogWithPaginationApiResponse = {
  count: number;
  products: ProductCatalogCard[];
}

export type Product = {
  /** Unique identifier */
  id: number;
  /** Name product */
  name: string;
  /** Description product */
  description?: string;
  /** Structure product */
  structure: string;
  /** Unique identifier type product */
  idTypeProduct: number;
};
export type ProductSize = {
  /** Unique identifier */
  id?: number;
  /** Unique identifier product */
  idProduct: number;
  /** Unique identifier size */
  idSize: number;
  /** Params for size */
  paramsSize: string;
  /** Count of product */
  count?: number;
  /** Prise of product */
  prise: number;
  extraPrice: number;
};
export type CreateProductSizeDto = {
  /** Unique identifier product */
  idProduct: number;
  /** Unique identifier size */
  idSize: number;
  /** Params for size */
  paramsSize: string;
  /** Count of product */
  count?: number;
  /** Prise of product */
  prise: number;
};
export type GetPaginationProductSizeDto = {
  /** Count all products */
  count: number;
  /** Products with pagination */
  productsSizes: ProductSize[];
};
export type Size = {
  /** Unique identifier */
  id?: number;
  /** Name */
  name: string;
};
export type Image = {
  /** Unique identifier */
  id?: number;
  /** Url to image */
  url: string;
  /** Unique identifier product */
  idProduct?: number;
};
export type ItemFilter = {
  /** Unique identifier */
  id?: number;
  /** Name */
  name: string;
  /** Unique identifie filter */
  idFilter?: number;
};
export type Category = {
  /** Unique identifier */
  id?: number;
  /** Name */
  name: string;
  /** url preview */
  url?: string;
};
export type ProductCardInfoDto = {
  /** Name product */
  name: string;
  /** Unique identifier type product */
  idTypeProduct: number;
  /** Image preview product */
  image: Image;
  /** Array of tags filters */
  filters: ItemFilter[];
  /** Array of categories */
  categories: Category[];
};
export type StaticticReviews = {
  /** Count reviews */
  count: number;
  /** Average rating */
  averageRating: number;
};
export type FullProductSizeDto = {
  /** Product size */
  productSize: ProductSize;
  /** Size */
  size: Size;
  /** Product info for card */
  product: ProductCardInfoDto;
  /** Statistics reviews */
  reviewsInfo?: StaticticReviews;
};
export type Review = {
  /** Unique identifier */
  id?: number;
  /** Rating of product */
  rating: number;
  /** Comment of product */
  comment?: string;
  /** Unique identifier user */
  idUser?: number;
  /** Name user */
  firstname?: string;
  /** Unique identifier product size */
  idProductSize: number;
};
export type OrderProductSize = {
  /** Unique identifier */
  id?: number;
  /** Count of products sizes */
  count: number;
  /** Unique identifier product size */
  idProductSize: number;
  /** Unique identifier order */
  idOrder: number;
};
export type ProductSizeInfo = {

  productSize: ProductSize;

  size: Size;
};
export type ProductWithSizes = {

  products: Product;

  productsSizes: ProductSizeInfo[];
};

export type ProductCatalogCard = {
  /** Unique identifier */
  id?: number;
  /** Name */
  name: string;
  /** Description */
  description?: string;

  structure?: string;
  /** Unique identifier type product */
  idTypeProduct: number;
  /** Array of images */
  images: Image[];
  /** Array of filters */
  filters: ItemFilter[];
  /** Array of categories */
  categories: Category[];
  reviewsInfo?: number;
  productSizes: [
    {
      productSize: ProductSize;
      size: Size;
    }
  ]
};
export type Number = {};
export const {
  useProductsControllerCreateMutation,
  useProductsControllerGetAllQuery,
  useProductsSizesControllerSearchQuery,
  useProductsControllerGetByIdQuery,
  useProductsSizesControllerCreateMutation,
  useProductsSizesControllerGetAllQuery,
  useProductsSizesControllerGetPaginationQuery,
  useProductsSizesControllerGetByIdQuery,
  useProductsSizesControllerGetByProductIdQuery,
  useProductsSizesControllerGetAllSizesByProductIdQuery,
  useProductsSizesControllerGetProductSizeForCardByIdQuery,
  useProductsSizesControllerGetByCategotyIdWithPaginationQuery,
  useReviewsControllerGetByProductSizeIdQuery,
  useReviewsControllerGetStaticticByProductSizeIdQuery,
  useOrdersProductsSizesControllerGetByIdQuery,
  useCategoriesProductsControllerGetAllQuery,
  useProductsSizesControllerGetByProductIdAndSizeIdQuery,
  useProductSizesControllerGetProductsWithPaginationQuery,
  useProductsControllerCreateWithDetailsMutation,
  useProductsControllerDeleteByIdMutation,
  useProductsControllerGetProductSizesCountQuery,
  useCategoryControllerGetIdByNameQuery,
  useProductsSizesControllerGetProductsCatalogWithPaginationQuery
} = injectedRtkApi;
