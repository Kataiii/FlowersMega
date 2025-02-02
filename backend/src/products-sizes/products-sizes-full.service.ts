import { Body, forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CategoriesProductsService } from "src/categories-products/categories-products.service";
import { Category } from "src/categories/categories.model";
import { ProductsItemsFilterService } from "src/products-items-filter/products-items-filter.service";
import { ProductsService } from "src/products/products.service";
import { ReviewsService } from "src/reviews/reviews.service";
import { SizesService } from "src/sizes/sizes.service";
import {
  CreateFullProductSizeDto,
  CreateProductSizeSmallDto,
  FilterWithItems,
  UpdareFullProductSizeDto,
  UpdateProductSizeSmallDto,
} from "./dto/createFullProduct.dto";
import { ProductSize } from "./products-sizes.model";
import { Op, or, where } from "sequelize";
import { ExtraPriceService } from "src/extra-price/extra-price.service";
import * as fs from "fs";
import { TypesProductService } from "src/types-product/types-product.service";
import { ItemFilter } from "src/items-filter/items-filter.model";
import { CategoriesService } from "src/categories/categories.service";
import { CategoriesProductssizesService } from "src/categories-productssizes/categories-productssizes.service";
import { CategoriesProductsSizes } from "src/categories-productssizes/categories-productssizes.model";
import { ItemsFilterService } from "src/items-filter/items-filter.service";
import { ExtraPrice } from "src/extra-price/extra-price.model";
import { Product } from "src/products/products.model";
import * as path from "path";
import { ProductsSizesService } from "./products-sizes.service";
import sequelize from "sequelize";

export class CustomFile implements File {
  buffer: Buffer;
  originalname: string;
  lastModified: number;
  name: string;
  webkitRelativePath: string;
  size: number;
  type: string;

  constructor(buffer: Buffer, name: string, type: string) {
    this.buffer = buffer;
    this.originalname = name;
    this.lastModified = Date.now();
    this.name = name;
    this.webkitRelativePath = "";
    this.size = buffer.length;
    this.type = type;
  }

  bytes(): Promise<Uint8Array> {
    throw new Error("Method not implemented.");
  }

  async arrayBuffer(): Promise<ArrayBuffer> {
    return this.buffer.buffer.slice(
      this.buffer.byteOffset,
      this.buffer.byteOffset + this.buffer.byteLength
    );
  }

  slice(start?: number, end?: number, contentType?: string): Blob {
    const slice = this.buffer.slice(start, end);
    return new Blob([slice], { type: contentType || this.type });
  }

  stream(): ReadableStream {
    const readable = new ReadableStream({
      start(controller) {
        controller.enqueue(this.buffer);
        controller.close();
      },
    });
    return readable;
  }

  async text(): Promise<string> {
    return this.buffer.toString("utf-8");
  }
}

@Injectable()
export class ProductsSizesFullService {
  constructor(
    @InjectModel(ProductSize)
    private productsSizesRepository: typeof ProductSize,
    @InjectModel(Product)
    private productsRepository: typeof Product,
    private productsService: ProductsService,
    private sizesService: SizesService,
    private reviewsService: ReviewsService,
    private categoriesProductService: CategoriesProductsService,
    private productsItemsFilterService: ProductsItemsFilterService,
    private extraPriceService: ExtraPriceService,
    private categoriesService: CategoriesService,
    private itemFilterService: ItemsFilterService,
    private typeProductService: TypesProductService,
    private categoriesProductsSizesService: CategoriesProductssizesService,
    @Inject(forwardRef(() => ProductsSizesService))
    private productsSizesService: ProductsSizesService
  ) {}

  // async onModuleInit() {
  //     await this.seeds("../backend/static/products/Flowers21.txt");
  // }

  async seeds(filePath: string): Promise<void> {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const lines = fileContent.split("\n");
    let index = 0;

    const categories = await this.categoriesService.getAll();
    const itemFIlters = await this.itemFilterService.getAll();
    const typeProducts = await this.typeProductService.getAll();
    const sizes = await this.sizesService.getAll();
    const extraPrises = await this.extraPriceService.getAll();

    for (const line of lines) {
      const [
        title,
        excerpt,
        productTags,
        pricesStr,
        imageUrl,
        categoryName,
        komuFiltersStr,
        povodFiltersStr,
        composition,
        sizesStr,
      ] = line.split(";");
      const [typeProductName, productName] = title.split(" - ");

      const typeProductId = typeProducts.find(
        (item) => item.name === typeProductName.trim()
      );
      if (!typeProductId) continue;

      const categoriesProduct = categoryName.split(",").map((categoryName) => {
        return categories.find((item) => item.name === categoryName.trim());
      });

      const validCategories = categoriesProduct.filter(
        (c) => c !== null || c !== undefined
      );

      const extraPrice = this.extraPriceForProductSize(
        extraPrises,
        validCategories.map((item) => item.id)
      );

      const itemFiltersProduct = [
        ...komuFiltersStr.split(","),
        ...povodFiltersStr.split(","),
      ].map((filterName) => {
        return itemFIlters.find((item) => item.name === filterName.trim());
      });

      const validItemFilters = itemFiltersProduct.filter(
        (c) => c !== null || c !== undefined
      );

      const prices = pricesStr
        .split(",")
        .map((price) => parseFloat(price.trim()));

      const sizesProduct = sizesStr.split(",").map((sizeStr, idx) => {
        const cleanedSizeStr = sizeStr.replace(/["']/g, "").trim();
        const [label, dimensions] =
          cleanedSizeStr.indexOf(":") === -1
            ? `${cleanedSizeStr}: `.split(":")
            : cleanedSizeStr.split(":");
        const sizeId = sizes.find((el) => el.name === label.trim()).id;

        if (!sizeId || !prices[idx]) return null;
        return {
          idSize: sizeId,
          paramsSize: dimensions.trim(),
          prise: prices[idx],
        };
      });
      const validSizes = sizesProduct.filter((s) => s !== null);

      const filePromise = await fetch(imageUrl.trim())
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
          }
          return response.arrayBuffer();
        })
        .then((arrayBuffer) => Buffer.from(arrayBuffer))
        .then(
          (buffer) =>
            new CustomFile(buffer, `image${index++}.jpg`, "image/jpeg")
        );

      const product = await this.productsService.create(
        {
          name: productName.trim(),
          description: excerpt.trim(),
          structure: composition.trim(),
          idTypeProduct: typeProductId ? typeProductId.id : 1,
        },
        [filePromise]
      );

      const productSizes = await Promise.all(
        validSizes.map(async (item) => {
          return await this.productsSizesRepository.create({
            idProduct: product.id,
            idSize: item.idSize,
            paramsSize: item.paramsSize,
            prise: item.prise,
            extraPrice: item.prise * ((100 + extraPrice) * 0.01),
          });
        })
      );

      await Promise.all(
        validCategories.map(async (item) => {
          await this.categoriesProductService.create({
            idProduct: product.id,
            idCategory: item.id,
          });
          await Promise.all(
            productSizes.map(async (el) => {
              await this.categoriesProductsSizesService.create({
                idCategory: item.id,
                idProductSize: el.id,
              });
            })
          );
        })
      );

      if (validItemFilters.length === 0) {
        console.log("No valid filters to insert for this product.");
      } else {
        await Promise.all(
          validItemFilters.map(async (item) => {
            try {
              const createdFilter =
                await this.productsItemsFilterService.create({
                  idProduct: product.id,
                  idItemFilter: item.id,
                });
              console.log("Created filter entry:", createdFilter);
            } catch (error) {
              console.error(
                `Failed to create filter for item ID ${item.id}:`,
                error
              );
            }
          })
        );
      }
    }
  }

  private extraPriceForProductSize(
    extraPrises: ExtraPrice[],
    categories: number[]
  ) {
    const generalExtra = extraPrises.find((item) => item.idCategory === "all");
    const categoriesExtra = categories.map((item) => {
      const prise = extraPrises.find((el) => el.idCategory === item.toString());
      return prise ? prise.value : 0;
    });
    return Math.max(...categoriesExtra, generalExtra.value);
  }

  private async getCardInfo(productSize: ProductSize) {
    const size = await this.sizesService.getById(productSize.idSize);
    const product = await this.productsService.getById(productSize.idProduct);
    const reviewsInfo = await this.reviewsService.getStaticticByProductSizeId(
      productSize.id
    );
    return {
      size: size,
      product: {
        name: product.name,
        idTypeProduct: product.idTypeProduct,
        image: product.images[0],
        filters: product.filters,
        categories: product.categories,
      },
      reviewsInfo: reviewsInfo,
    };
  }

  async getFullById(id: number) {
    const productSize = await this.productsSizesRepository.findOne({
      where: { id: id },
    });
    const info = await this.getCardInfo(productSize);
    return {
      productSize: productSize,
      size: info.size,
      product: info.product,
      reviewsInfo: info.reviewsInfo,
    };
  }

  async getCategoryProductsSizesBySearch(search?: string) {
    const sizeId = await this.sizesService.getSizeByName("-");
    if (search && search.includes("all")) {

      const categories = await this.categoriesProductService.getTopCategories();

      const prodSizes = await this.productsSizesRepository.findAll({
        where: { idSize: { [Op.ne]: sizeId } },
      });

      const products = await this.productsService.getAll();
      const filteredProducts = products.filter((product) =>
        prodSizes.some((size) => size.idProduct === product.id)
      );

      const limitedProducts = filteredProducts.slice(0, 10);
      return { category: categories, products: limitedProducts };
    }

    if (search !== null && search !== undefined) {
      const categories =
        await this.categoriesProductService.getSearchCategoryByName(search);
      const products = await this.productsService.searchProducts(search);

      const prodSizes = await this.productsSizesRepository.findAll({
        where: { idSize: { [Op.ne]: sizeId } },
      });
      const filteredProducts = products.filter((product) =>
        prodSizes.some((size) => size.idProduct === product.id)
      );

      const limitedProducts = filteredProducts.slice(0, 10);
      return { category: categories, products: limitedProducts };
    }
  }

  async getProductsSizesForCardPagination(
    page: number,
    limit: number,
    search?: string,
    filterItems?: number[],
    minPrice?: number,
    maxPrice?: number,
    category?: number
  ) {
    const filtersProductsTmp =
      filterItems?.length > 0 &&
      (
        await this.productsItemsFilterService.getProductsByFilterIdArray(
          filterItems
        )
      ).map((item) => item.idProduct);
    const filtersProducts =
      filtersProductsTmp && Array.from(new Set(filtersProductsTmp.flat()));

    const whereCondition: any = {};

    if (minPrice >= 0) {
      whereCondition.extraPrice = { [Op.gte]: minPrice };
    }

    if (maxPrice >= 0) {
      whereCondition.extraPrice = {
        ...whereCondition.extraPrice,
        [Op.lte]: maxPrice,
      };
    }

    if (filtersProducts?.length > 0) {
      whereCondition.idProduct = {
        [Op.in]: filtersProducts,
      };
    }
    let countAndProducts: {
      rows: ProductSize[];
      count: number;
    } = {
      rows: [],
      count: 0,
    };

    if (category) {
      countAndProducts = await this.productsSizesRepository.findAndCountAll({
        where: whereCondition,
        limit: limit,
        offset: (page - 1) * limit,
        include: [
          {
            model: CategoriesProductsSizes,
            where: {
              idCategory: category,
            },
          },
          {
            model: Product,
            where: {
              name: { [Op.like]: search ? `%${search}%` : `%` },
            },
          },
        ],
      });
    } else {
      countAndProducts = await this.productsSizesRepository.findAndCountAll({
        where: whereCondition,
        limit: limit,
        offset: (page - 1) * limit,
        include: [
          {
            model: Product,
            where: {
              name: { [Op.like]: search ? `%${search}%` : `%` },
            },
          },
        ],
      });
    }

    const resCardInfo = await this.calculatePrices(countAndProducts.rows);

    return {
      count: countAndProducts.count,
      products: resCardInfo,
    };
  }

  async getProductsSizesForCatalogPagination(
    page: number,
    limit: number,
    search?: string,
    filterItems?: number[],
    minPrice?: number,
    maxPrice?: number,
    category?: number,
    sort?: string
  ) {
    const typeSort = sort ? sort.split("_") : "id_ASC".split("_");
    const sortField: string = typeSort[0];
    const sortOrder: string = typeSort[1]?.toUpperCase();

    const filtersString: string = filterItems && filterItems.length > 0
      ? `AND (${filterItems.map(filter => `pif."idItemFilter" = ${filter}`).join(' OR ')})`
      : '';

    const sortString = sortField === "price" 
      ? `(SELECT ${sortOrder === "ASC" ? `min(psd."extraPrice")` : `max(psd."extraPrice")`} 
          FROM products_sizes_data psd
          WHERE psd."idProduct" = pd.id)`
      : `(w.review_info_data->>'count')::int`;

    const count: [{total_count: string}[], unknown] = await this.productsRepository.sequelize.query(`
      WITH total_count AS (
        SELECT COUNT(*) AS total_count
        FROM (
          WITH product_data AS (
            SELECT DISTINCT 
            p.id,
            p.name,
            p.description,
            p.structure,
            p."idTypeProduct",
            p."createdAt",
            p."updatedAt",
            img.id as "idImage",
            img.url
            FROM public.products p
            JOIN public.products_sizes ps ON p.id=ps."idProduct"
            JOIN public.categories_products cp ON p.id=cp."idProduct"
            JOIN public.products_items_filter pif ON p.id=pif."idProduct"
            JOIN public.images img ON p.id=img."idProduct"
            JOIN public.categories c ON c.id=cp."idCategory"
            WHERE ps."extraPrice" > ${minPrice ?? 0}
              ${maxPrice ? `AND ps."extraPrice" < ${maxPrice}` : ''}
              ${search ? `AND p.name LIKE '%${search}%' ` : ''}
              ${category ? `AND cp."idCategory" = ${category}` : ''}
              ${filtersString}
          ),
          categories_data AS (
            SELECT c.*, cp.id as "idProductCategory", p.id as "idProduct"
            FROM public.categories c
            JOIN public.categories_products cp ON c.id = cp."idCategory"
            JOIN public.products p ON p.id = cp."idProduct"
          ),
          filters_data AS (
            SELECT if.*, pif.id as "idProductItemFilter", p.id as "idProduct"
            FROM public.items_filter if
            JOIN public.products_items_filter pif ON if.id = pif."idItemFilter"
            JOIN public.products p ON p.id = pif."idProduct"
          ),
          products_sizes_data AS (
            SELECT ps.*, s.name as "nameSize"
            FROM public.products_sizes ps
            JOIN public.products p ON p.id = ps."idProduct"
            JOIN public.sizes s ON s.id=ps."idSize"
            ORDER BY s.id
          ),
          review_info AS (
            SELECT 
            p.id AS "idProduct",
            COALESCE(COUNT(r.id), 0) AS cou,
            COALESCE(AVG(r.rating), 0) AS rating
            FROM public.products p
            LEFT JOIN public.products_sizes ps ON p.id = ps."idProduct"
            LEFT JOIN public.reviews r ON ps.id = r."idProductSize"
            GROUP BY p.id
            ORDER BY p.id ASC
          )
          SELECT 
            JSON_BUILD_OBJECT(
            'id', pd.id,
            'name', pd.name,
            'description', pd.description,
            'structure', pd.structure,
            'idTypeProduct', pd."idTypeProduct",
            'createdAt', pd."createdAt",
            'updatedAt', pd."updatedAt",
            'image', JSON_BUILD_OBJECT('id', pd."idImage", 'url', pd.url),
            'categories', categories_array,
            'filters', filters_array,
            'productSizes', products_sizes_array,
            'reviewInfo', review_info_data
            ) AS product
          FROM product_data pd
          CROSS JOIN LATERAL (
            SELECT jsonb_agg(JSON_BUILD_OBJECT ('id', cd.id, 'name', cd.name))
            FROM categories_data cd
            WHERE cd."idProduct" = pd.id
          ) AS t(categories_array)
          CROSS JOIN LATERAL (
            SELECT jsonb_agg(JSON_BUILD_OBJECT ('id', fd.id, 'name', fd.name, 'idFilter', fd."idFilter"))
            FROM filters_data fd
            WHERE fd."idProduct" = pd.id
          ) as q(filters_array)
          CROSS JOIN LATERAL (
            SELECT jsonb_agg(JSON_BUILD_OBJECT ( 'productSize', JSON_BUILD_OBJECT('id', psd.id, 'idProduct', psd."idProduct", 'idSize', psd."idSize", 'paramsSize', psd."paramsSize", 'prise', psd."extraPrice"), 'size',  JSON_BUILD_OBJECT( 'id', psd."idSize", 'name', psd."nameSize") ))
            FROM products_sizes_data psd
            WHERE psd."idProduct" = pd.id
          ) AS s(products_sizes_array)
          CROSS JOIN LATERAL (
            SELECT JSON_BUILD_OBJECT('count', ri.cou, 'averageRating', ri.rating)
            FROM review_info ri
            WHERE ri."idProduct" = pd.id
          ) as w(review_info_data)
        ) AS main_query
      )
      SELECT * FROM total_count;
    `) as [{total_count: string}[], unknown];

    const products = await this.productsRepository.sequelize.query(`
    WITH product_data AS (
      SELECT DISTINCT 
        p.id,
        p.name,
        p.description,
        p.structure,
        p."idTypeProduct",
        p."createdAt",
        p."updatedAt",
        img.id as "idImage",
        img.url
      FROM public.products p
      JOIN public.products_sizes ps ON p.id=ps."idProduct"
      JOIN public.categories_products cp ON p.id=cp."idProduct"
      JOIN public.products_items_filter pif ON p.id=pif."idProduct"
      JOIN public.images img ON p.id=img."idProduct"
      JOIN public.categories c ON c.id=cp."idCategory"
      WHERE ps."extraPrice" > ${minPrice ?? 0}
        ${maxPrice ? `AND ps."extraPrice" < ${maxPrice}` : ''}
        ${search ? `AND p.name LIKE '%${search}%' ` : ''}
        ${category ? `AND cp."idCategory" = ${category}` : ''}
        ${filtersString}
    ),
    categories_data AS (
      SELECT c.*, cp.id as "idProductCategory", p.id as "idProduct"
      FROM public.categories c
      JOIN public.categories_products cp ON c.id = cp."idCategory"
      JOIN public.products p ON p.id = cp."idProduct"
    ),
    filters_data AS (
      SELECT if.*, pif.id as "idProductItemFilter", p.id as "idProduct"
      FROM public.items_filter if
      JOIN public.products_items_filter pif ON if.id = pif."idItemFilter"
      JOIN public.products p ON p.id = pif."idProduct"
    ),
    products_sizes_data AS (
      SELECT ps.*, s.name as "nameSize"
      FROM public.products_sizes ps
      JOIN public.products p ON p.id = ps."idProduct"
      JOIN public.sizes s ON s.id=ps."idSize"
      ORDER BY s.id
    ),
    review_info AS (
      SELECT 
        p.id AS "idProduct",
       COALESCE(COUNT(r.id), 0) AS cou,
       COALESCE(AVG(r.rating), 0) AS rating
      FROM public.products p
      LEFT JOIN public.products_sizes ps ON p.id = ps."idProduct"
      LEFT JOIN public.reviews r ON ps.id = r."idProductSize"
      GROUP BY p.id
      ORDER BY p.id ASC
    )
    SELECT 
      JSON_BUILD_OBJECT(
        'id', pd.id,
        'name', pd.name,
        'description', pd.description,
        'structure', pd.structure,
        'idTypeProduct', pd."idTypeProduct",
        'createdAt', pd."createdAt",
        'updatedAt', pd."updatedAt",
        'image', JSON_BUILD_OBJECT('id', pd."idImage", 'url', pd.url),
        'categories', categories_array,
      'filters', filters_array,
      'productSizes', products_sizes_array,
      'reviewInfo', review_info_data
      ) AS product
    FROM product_data pd
    CROSS JOIN LATERAL (
      SELECT jsonb_agg(JSON_BUILD_OBJECT ('id', cd.id, 'name', cd.name))
      FROM categories_data cd
      WHERE cd."idProduct" = pd.id
    ) AS t(categories_array)
    CROSS JOIN LATERAL (
      SELECT jsonb_agg(JSON_BUILD_OBJECT ('id', fd.id, 'name', fd.name, 'idFilter', fd."idFilter"))
      FROM filters_data fd
      WHERE fd."idProduct" = pd.id
    ) as q(filters_array)
    CROSS JOIN LATERAL (
      SELECT jsonb_agg(JSON_BUILD_OBJECT ( 'productSize', JSON_BUILD_OBJECT('id', psd.id, 'idProduct', psd."idProduct", 'idSize', psd."idSize", 'paramsSize', psd."paramsSize", 'prise', psd."extraPrice"), 'size',  JSON_BUILD_OBJECT( 'id', psd."idSize", 'name', psd."nameSize") ))
      FROM products_sizes_data psd
      WHERE psd."idProduct" = pd.id
    ) AS s(products_sizes_array)
    CROSS JOIN LATERAL (
      SELECT JSON_BUILD_OBJECT('count', ri.cou, 'averageRating', ri.rating)
      FROM review_info ri
      WHERE ri."idProduct" = pd.id
    ) as w(review_info_data)
    ORDER BY ${sortString} ${sortOrder}
    `)

    const productPagination = products[0].slice((page - 1) * limit, page * limit);

    return {
        count: Number(count[0][0].total_count),
        //@ts-ignore
        products: productPagination.map(item => item.product),
    };
  }

  async calculatePrices(products: ProductSize[]) {
    const extraPriceForCategories =
      await this.extraPriceService.whichOneTheBest();
    let countProductsWithMarkup = 0;

        const productsCardInfo = await Promise.all(
            products.map(async (item) => {
                const info = await this.getCardInfo(item);
                return {
                    productSize: {
                        id: item.id,
                        idProduct: item.idProduct,
                        idSize: item.idSize,
                        paramsSize: item.paramsSize,
                        count: item.count,
                        prise: item.prise,
                        extraPrice: item.extraPrice,
                        orders: item.orders,
                    },
                    size: info.size,
                    product: info.product,
                    reviewsInfo: info.reviewsInfo,
                };
            })
        );
        const updatedProducts = productsCardInfo.map((item) => {
            const productSize = { ...item.productSize };

      return {
        ...item,
        productSize: productSize,
      };
    });

    return updatedProducts;
  }

  async getProductSizeInfo(id: number) {
    const productSize = await this.productsSizesRepository.findOne({
      where: { id: id },
    });
    const size = await this.sizesService.getById(productSize.idSize);
    return { productSize: productSize, size: size };
  }

  async getProductsWithPagination(
    page: number,
    limit: number,
    search?: string,
    field?: string,
    type?: string,
    categories?: number[],
    filters?: number[]
  ) {
    const categoriesProductsTmp =
      categories.length > 0
        ? await Promise.all(
            categories.map(async (item) => {
              return (
                await this.categoriesProductService.getProductsByCategoryId(
                  item
                )
              ).map((item) => item.idProduct);
            })
          )
        : (await this.productsService.getAll()).map((item) => item.id);

    const filtersProductsTmp =
      filters.length > 0
        ? await Promise.all(
            filters.map(async (item) => {
              return (
                await this.productsItemsFilterService.getProductsByFilterId(
                  item
                )
              ).map((item) => item.idProduct);
            })
          )
        : (await this.productsService.getAll()).map((item) => item.id);

    const categoriesProducts = Array.from(
      new Set(categoriesProductsTmp.flat())
    );
    const filtersProducts = Array.from(new Set(filtersProductsTmp.flat()));

    const finalFIlterCategories = categoriesProducts.filter((item) =>
      filtersProducts.includes(item)
    );

        const paginationResult = await this.productsService.getCountAndPagination(
            page,
            limit,
            search,
            field,
            type,
            finalFIlterCategories
        );
        const productSizesTmp = await Promise.all(
            paginationResult.products.map(async (item) => {
                const productSizes = await this.productsSizesRepository.findAll({
                    where: { idProduct: item.id },
                });
                const resultProducts = await this.calculatePrices(productSizes);
                // const productWithSizes = await Promise.all(productSizes.map(async (item) => {
                //     return await this.getProductSizeInfo(item.id);
                // }))
                return { products: item, productsSizes: resultProducts };
            })
        );

        return { count: paginationResult.count, products: productSizesTmp };
    }

  async createFullProduct(dto: CreateFullProductSizeDto, photo: File) {
    const prosuctsSizes = JSON.parse(
      `[${dto.productSize.toString()}]`
    ) as CreateProductSizeSmallDto[];
    const categories = JSON.parse(
      `[${dto.categories.toString()}]`
    ) as Category[];
    const filters = JSON.parse(`[${dto.filters.toString()}]`) as ItemFilter[];
    const product = await this.productsService.create(
      {
        name: dto.name,
        description: dto.description,
        structure: dto.structure,
        idTypeProduct: dto.type,
      },
      photo ? [photo] : undefined
    );
    const productSizesData = await Promise.all(
      prosuctsSizes.map(async (item) => {
        return await this.productsSizesRepository.create({
          idProduct: product.id,
          idSize: item.idSize,
          paramsSize: item.paramsSize,
          prise: item.prise,
          extraPrice: item.prise,
        });
      })
    );
    await Promise.all(
      categories.map(async (item) => {
        await this.categoriesProductService.create({
          idProduct: product.id,
          idCategory: item.id,
        });
        productSizesData.forEach(async (el) => {
          await this.categoriesProductsSizesService.create({
            idProductSize: el.id,
            idCategory: item.id,
          });
        });
      })
    );

    await Promise.all(
      filters.map(async (item) => {
        return await this.productsItemsFilterService.create({
          idProduct: product.id,
          idItemFilter: item.id,
        });
      })
    );

    await this.productsSizesService.updatePrices();

    return product;
  }

  async updateFullProduct(
    dto: UpdareFullProductSizeDto,
    photo: File | null,
    @Body() body?: any
  ) {
    const productsSizes = JSON.parse(
      `[${dto.productSize.toString()}]`
    ) as UpdateProductSizeSmallDto[];
    const categories = JSON.parse(
      `[${dto.categories.toString()}]`
    ) as Category[];
    const filters = JSON.parse(`[${dto.filters.toString()}]`) as ItemFilter[];

    const product = await this.productsService.update(
      {
        id: dto.id,
        name: dto.name,
        description: dto.description,
        structure: dto.structure,
        idTypeProduct: dto.type,
      },
      photo ? [photo] : undefined
    );

    if (!photo) {
      const imageUrl = product.images?.[0]?.url;
      if (imageUrl) {
        const filePath = path.resolve(
          __dirname,
          "..",
          "..",
          "static",
          "products",
          "images",
          product.id.toString(),
          imageUrl
        );
        fs.unlink(filePath, (err) => {
          if (err) console.error(`Ошибка удаления файла: ${err.message}`);
        });
        product.images[0].url = null; // Обнуляем URL
        await product.save();
      }
    }
    const productSizesData = await this.productsSizesRepository.findAll({
      where: { idProduct: product.id },
    });
    const productSizesDublicates = productSizesData
      .map((item) => item.idSize)
      .filter((item) =>
        productsSizes.map((item) => item.idSize).includes(item)
      );
    await Promise.all(
      productSizesData.map(async (item) => {
        const size = productSizesDublicates.find((el) => el === item.idSize);
        const newProductSize = productsSizes.find((el) => el.idSize === size);
        if (!size)
          await this.productsSizesRepository.destroy({
            where: { id: item.id },
          });
        else if (
          item.paramsSize !== newProductSize.paramsSize ||
          item.prise !== newProductSize.prise
        ) {
          productsSizes.find((el) => el.idSize === size).paramsSize;
          await this.productsSizesRepository.update(
            {
              paramsSize: newProductSize.paramsSize,
              prise: newProductSize.prise,
              extraPrice: newProductSize.prise,
            },
            { where: { id: item.id } }
          );
        }
      })
    );

    await Promise.all(
      productsSizes.map(async (item) => {
        if (!productSizesDublicates.find((el) => el === item.idSize))
          await this.productsSizesRepository.create({
            ...item,
            extraPrice: item.prise,
            idProduct: product.id,
          });
      })
    );

    const newProductSizes = await this.productsSizesRepository.findAll({
      where: { idProduct: product.id },
    });
    await this.categoriesProductService.update(categories, product.id);
    await Promise.all(
      newProductSizes.map(async (item, index) => {
        await this.categoriesProductsSizesService.update(categories, item.id);
      })
    );

    await this.productsItemsFilterService.update(filters, product.id);

    return product;
  }

  async deleteProductWithSizes(
    productId: number
  ): Promise<{ message: string }> {
    await this.productsSizesRepository.destroy({
      where: { idProduct: productId },
    });
    await this.productsService.deleteProduct(productId);
    return { message: "Product and all associated sizes deleted successfully" };
  }

  async getMaxPrice(idCategory?: number) {
    let productSize: ProductSize;
    if (idCategory) {
      productSize = await this.productsSizesRepository.findOne({
        order: [["extraPrice", "DESC"]],
        limit: 1,
        include: [
          {
            model: CategoriesProductsSizes,
            where: {
              idCategory: idCategory,
            },
          },
        ],
      });
    } else {
      productSize = await this.productsSizesRepository.findOne({
        order: [["extraPrice", "DESC"]],
        limit: 1,
      });
    }
    return productSize !== null ? productSize.extraPrice : 0;
  }
}
