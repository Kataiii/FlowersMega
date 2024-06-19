import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: './swagger.json',
  apiFile: './store/emptyApi.ts',
  apiImport: 'emptyApi',
  outputFiles: {
    './store/city.ts': {
      filterEndpoints: [/cities/i],
      exportName: 'cityApi',
    },
    './store/user.ts': {
      filterEndpoints: [/users/i],
      exportName: 'userApi'
    },
    './store/filter.ts': {
      filterEndpoints: [/filters/i],
      exportName: 'filterApi'
    },
    './store/itemFilter.ts': {
      filterEndpoints: [/items-filter/i],
      exportName: 'itemFilterApi'
    },
    './store/category.ts': {
      filterEndpoints: [/categories/i],
      exportName: 'categoryApi'
    },
    './store/typeProduct.ts': {
      filterEndpoints: [/types-product/i],
      exportName: 'typeProductApi'
    },
    './store/product.ts': {
      filterEndpoints: [/products/i],
      exportName: 'productApi'
    },
    './store/size.ts': {
      filterEndpoints: [/sizes/i],
      exportName: 'sizeApi'
    },
    './store/productSize.ts': {
      filterEndpoints: [/products-sizes/i],
      exportName: 'productSizeApi'
    },
    './store/order.ts': {
      filterEndpoints: [/orders/i],
      exportName: 'orderApi'
    },
    './store/orderProductSize.ts': {
      filterEndpoints: [/orders-products-sizes/i],
      exportName: 'orderProductSizeApi'
    },
    './store/review.ts': {
      filterEndpoints: [/reviews/i],
      exportName: 'reviewApi'
    },
    './store/auth.ts': {
      filterEndpoints: [/auth/i],
      exportName: 'authApi'
    },
    './store/categoryProduct.ts': {
      filterEndpoints: [/categories-products/i],
      exportName: 'categoryProductApi'
    },
  },
  hooks: true,
}

export default config