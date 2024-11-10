import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoriesProductsService } from 'src/categories-products/categories-products.service';
import { Category } from 'src/categories/categories.model';
import { ProductsItemsFilterService } from 'src/products-items-filter/products-items-filter.service';
import { ProductsService } from 'src/products/products.service';
import { ReviewsService } from 'src/reviews/reviews.service';
import { SizesService } from 'src/sizes/sizes.service';
import { CreateFullProductSizeDto, CreateProductSizeSmallDto, FilterWithItems } from './dto/createFullProduct.dto';
import { ProductSize } from './products-sizes.model';
import { Op, or, where } from 'sequelize';
import { ExtraPriceService } from 'src/extra-price/extra-price.service';
import * as fs from 'fs';
import { TypesProductService } from 'src/types-product/types-product.service';
import { ItemFilter } from 'src/items-filter/items-filter.model';
import { CategoriesService } from 'src/categories/categories.service';
import { CategoriesProductssizesService } from 'src/categories-productssizes/categories-productssizes.service';
import { CategoriesProductsSizes } from 'src/categories-productssizes/categories-productssizes.model';

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

    async arrayBuffer(): Promise<ArrayBuffer> {
        return this.buffer.buffer.slice(this.buffer.byteOffset, this.buffer.byteOffset + this.buffer.byteLength);
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
            }
        });
        return readable;
    }

    async text(): Promise<string> {
        return this.buffer.toString('utf-8');
    }
}

@Injectable()
export class ProductsSizesFullService {
    constructor(
        @InjectModel(ProductSize) private productsSizesRepository: typeof ProductSize,
        private productsService: ProductsService,
        private sizesService: SizesService,
        private reviewsService: ReviewsService,
        private categoriesProductService: CategoriesProductsService,
        private productsItemsFilterService: ProductsItemsFilterService,
        private extraPriceService: ExtraPriceService,
        private typeProductService: TypesProductService,
        private categoriesProductsSizesService: CategoriesProductssizesService
    ) { }

    // async onModuleInit() {
    //     await this.seeds("../backend/static/products/FLOWERS.txt");
    // }

    async seeds(filePath: string): Promise<void> {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.split('\n');
        let index = 0;

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
                sizesStr
            ] = line.split(';');
            const [typeProductName, productName] = title.split(' - ');

            const typeProductId = await this.typeProductService.getTypeProductByName(typeProductName.trim());
            if (!typeProductId) continue;

            const categories = await Promise.all(
                categoryName.split(',').map(async (categoryName) => {
                    const category = await this.categoriesProductService.getCategoryByName(categoryName.trim());
                    return category ? category : null;
                })
            );
            const validCategories = categories.filter((c) => c !== null);

            const komuFilters = await Promise.all(
                komuFiltersStr.split(',').map(async (filterName) => {
                    const filter = await this.productsItemsFilterService.getItemFilterByName(filterName.trim());
                    return filter ? filter : null;
                })
            );
            const povodFilters = await Promise.all(
                povodFiltersStr.split(',').map(async (filterName) => {
                    const filter = await this.productsItemsFilterService.getItemFilterByName(filterName.trim());
                    return filter ? filter : null;
                })
            );
            const validFilters = [...komuFilters, ...povodFilters].filter((f) => f !== null);

            const prices = pricesStr.split(',').map((price) => parseFloat(price.trim()));
            const sizes = await Promise.all(
                sizesStr.split(',').map(async (sizeStr, idx) => {
                    const cleanedSizeStr = sizeStr.replace(/["']/g, '').trim();
                    const [label, dimensions] = cleanedSizeStr.split(':');
                    const sizeId = await this.sizesService.getSizeByName(label.trim());

                    if (!sizeId || !prices[idx]) return null;
                    return {
                        idSize: sizeId,
                        paramsSize: dimensions.trim(),
                        prise: prices[idx]
                    };
                })
            );
            const validSizes = sizes.filter((s) => s !== null);

            const filePromise = await fetch(imageUrl.trim())
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch image: ${response.statusText}`);
                    }
                    return response.arrayBuffer();
                })
                .then(arrayBuffer => Buffer.from(arrayBuffer))
                .then(buffer => new CustomFile(buffer, `image${index++}.jpg`, "image/jpeg"));

            const product = await this.productsService.create({
                name: productName.trim(),
                description: excerpt.trim(),
                structure: composition.trim(),
                idTypeProduct: typeProductId
            }, [filePromise]);

            await Promise.all(validSizes.map(async (item) => {
                return await this.productsSizesRepository.create({
                    idProduct: product.id,
                    idSize: item.idSize,
                    paramsSize: item.paramsSize,
                    prise: item.prise
                });
            }));

            await Promise.all(validCategories.map(async (item) => {
                return await this.categoriesProductService.create({
                    idProduct: product.id,
                    //@ts-ignore
                    idCategory: item.id
                });
            }));

            if (validFilters.length === 0) {
                console.log('No valid filters to insert for this product.');
            } else {
                await Promise.all(validFilters.map(async (item) => {
                    try {
                        const createdFilter = await this.productsItemsFilterService.create({
                            idProduct: product.id,
                            idItemFilter: item.id
                        });
                        console.log('Created filter entry:', createdFilter);
                    } catch (error) {
                        console.error(`Failed to create filter for item ID ${item.id}:`, error);
                    }
                }));
            }
        }
    }


    private async getCardInfo(productSize: ProductSize) {
        // console.log(productSize, "PRODUCT SIZE")
        const size = await this.sizesService.getById(productSize.idSize);
        const product = await this.productsService.getById(productSize.idProduct);
        const reviewsInfo = await this.reviewsService.getStaticticByProductSizeId(productSize.id);
        // console.log(product, "product");
        return {
            size: size,
            product: {
                name: product.name,
                idTypeProduct: product.idTypeProduct,
                image: product.images[0],
                filters: product.filters,
                categories: product.categories
            },
            reviewsInfo: reviewsInfo
        }
    }

    async getFullById(id: number) {
        const productSize = await this.productsSizesRepository.findOne(
            {
                where: { id: id }
            }
        );
        const info = await this.getCardInfo(productSize);
        return {
            productSize: productSize,
            size: info.size,
            product: info.product,
            reviewsInfo: info.reviewsInfo
        };
    }

    async getCategoryProductsSizesBySearch(search?: string) {
        console.log(search, "NUUUUUUUUU LYAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

        const sizeId = await this.sizesService.getSizeByName('-');

        if (search && search.includes('all')) {
            console.log("HAHAHAHAHA?");

            const categories = await this.categoriesProductService.getTopCategories();

            const prodSizes = await this.productsSizesRepository.findAll({
                where: { idSize: { [Op.ne]: sizeId } }
            });

            const products = await this.productsService.getAll();
            const filteredProducts = products.filter(product =>
                prodSizes.some(size => size.idProduct === product.id)
            );

            const limitedProducts = filteredProducts.slice(0, 10);
            return { category: categories, products: limitedProducts };
        }

        if (search !== null && search !== undefined) {
            console.log("KAAAAAAAAAAAAAAAAAAK?");

            const categories = await this.categoriesProductService.getSearchCategoryByName(search);
            const products = await this.productsService.searchProducts(search);

            const prodSizes = await this.productsSizesRepository.findAll({
                where: { idSize: { [Op.ne]: sizeId } }
            });
            const filteredProducts = products.filter(product =>
                prodSizes.some(size => size.idProduct === product.id)
            );

            const limitedProducts = filteredProducts.slice(0, 10);
            return { category: categories, products: limitedProducts };
        }
    }


    async getProductsSizesForCardPagination(page: number, limit: number, search?: string, filterItems?: number[], minPrice?: number, maxPrice?: number, category?: number) {
        console.log(filterItems, "filterItems");
        console.log(category, "LMAO uAPL");
        console.log(search, "search");
        if (category) {
            if (filterItems.length > 0 || minPrice || maxPrice) {
                const filtersProductsTmp = filterItems.length > 0 ? await Promise.all(filterItems.map(async (item) => {
                    return (await this.productsItemsFilterService.getProductsByFilterId(item)).map(item => item.idProduct);
                })) : (await this.productsService.getAll()).map(item => item.id);
                const filtersProducts = Array.from(new Set(filtersProductsTmp.flat()));
                const whereCondition: any = {};
                if (minPrice) {
                    whereCondition.prise = { [Op.gte]: minPrice };
                }
                if (maxPrice) {
                    whereCondition.prise = {
                        ...whereCondition.prise,
                        [Op.lte]: maxPrice
                    };
                }

                if (category) {
                    const productsByCategory = await this.productsService.getProductsByCategoryId(category);
                    const productsIdsByCategory = productsByCategory.map(product => product.id);
                    if (filtersProducts.length > 0) {
                        whereCondition.idProduct = { [Op.in]: filtersProducts.filter(id => productsIdsByCategory.includes(id)) };
                    } else {
                        whereCondition.idProduct = { [Op.in]: productsIdsByCategory };
                    }
                }
                const tmp = this.extraPriceService.whichOneTheBest();
                // console.log(tmp, "HHHHHHHEEEEEEEEEEEEEEEELPPPPPPPPPPPPP")
                const countAndProducts = await this.productsSizesRepository.findAndCountAll({
                    where: whereCondition,
                    limit: limit,
                    offset: (page - 1) * limit,
                });
                const resCardInfo = await this.calculatePrices(countAndProducts.rows)
                return {
                    count: countAndProducts.count,
                    products: resCardInfo,
                }
            }
        }
        const extraPriceForCategories = await this.extraPriceService.whichOneTheBest();
        // console.log(extraPriceForCategories, "HHHHHHHEEEEEEEEEEEEEEEELPPPPPPPPPPPPP")
        const whereCondition: any = {};
        let count = await this.productsSizesRepository.findAndCountAll();
        if (search) {
            const foundProducts = await this.productsService.searchProducts(search);
            const foundProductIds = foundProducts.map(product => product.id);
            if (foundProductIds.length > 0) {
                count.count = foundProductIds.length;
                whereCondition.idProduct = { [Op.in]: foundProductIds };
            } else {
                return {
                    count: 0,
                    products: []
                };
            }
        }

        if (minPrice) {
            whereCondition.prise = { [Op.gte]: minPrice };
        }
        if (maxPrice) {
            whereCondition.prise = {
                ...whereCondition.prise,
                [Op.lte]: maxPrice
            };
        }
        console.log(whereCondition, "whereCondition");


        const products = await this.productsSizesRepository.findAll({
            where: whereCondition,
            limit: limit,
            offset: (page - 1) * limit,
        });

        const updatedProducts = await this.calculatePrices(products);
        // console.log(minPrice, maxPrice, "LOW MAX PRICE")
        const result = updatedProducts.filter(item => {
            // console.log(`Checking item: ${JSON.stringify(item.productSize.prise)}`);
            if (maxPrice) return item.productSize.prise > 0 && item.productSize.prise <= maxPrice;
            else return item
        });

        // console.log(result, "SUPERAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        // console.log(updatedProducts, "SUPERUPD")
        return {
            count: count.count,
            products: result
        }
    }

    async calculatePrices(products: ProductSize[]) {
        const extraPriceForCategories = await this.extraPriceService.whichOneTheBest();
        let countProductsWithMarkup = 0;

        console.log(extraPriceForCategories, "EPRIE BTW")
        const productsCardInfo = await Promise.all(products.map(async (item) => {
            const info = await this.getCardInfo(item);
            // item.prise *= 1.22;
            return {
                productSize: {
                    id: item.id,
                    idProduct: item.idProduct,
                    idSize: item.idSize,
                    paramsSize: item.paramsSize,
                    count: item.count,
                    prise: item.prise,
                    orders: item.orders,
                },
                size: info.size,
                product: info.product,
                reviewsInfo: info.reviewsInfo
            }
        }));
        const updatedProducts = productsCardInfo.map(item => {

            const productSize = { ...item.productSize };
            const categories = item.product.categories || [];
            let priceMultiplier = extraPriceForCategories.get('all') || 0;

            if (categories.length === 1) {
                priceMultiplier = extraPriceForCategories.get(categories[0].id.toString()) || priceMultiplier;
            } else if (categories.length > 1) {
                const multipliers = categories.map(cat => extraPriceForCategories.get(cat.id.toString()) || priceMultiplier);
                priceMultiplier = Math.max(...multipliers);
            }

            if (priceMultiplier > 0) {
                countProductsWithMarkup++;
            }

            console.log(priceMultiplier, 'aaaaaaaaaaaa""""""""""""""""""""""""""""""""');
            console.log(productSize.prise, "DOOOOOO");

            const updatedPrice = Math.floor(productSize.prise + (productSize.prise / 100) * priceMultiplier);
            console.log(updatedPrice, "NUUUUUUUUUUUUU");

            return {
                ...item,
                productSize: {
                    ...productSize,
                    prise: updatedPrice,
                }
            };
        });


        return updatedProducts;

    }

    async getProductSizeInfo(id: number) {
        const productSize = await this.productsSizesRepository.findOne({ where: { id: id } });
        const size = await this.sizesService.getById(productSize.idSize);
        return { productSize: productSize, size: size }
    }

    async getProductsWithPagination(page: number, limit: number, search?: string, field?: string, type?: string, categories?: number[], filters?: number[]) {
        // console.log(categories, "categories");
        const categoriesProductsTmp = categories.length > 0 ? await Promise.all(categories.map(async (item) => {
            return (await this.categoriesProductService.getProductsByCategoryId(item)).map(item => item.idProduct);
        })) : (await this.productsService.getAll()).map(item => item.id);
        // console.log(categoriesProductsTmp, "categTNM");
        const filtersProductsTmp = filters.length > 0 ? await Promise.all(filters.map(async (item) => {
            return (await this.productsItemsFilterService.getProductsByFilterId(item)).map(item => item.idProduct);
        })) : (await this.productsService.getAll()).map(item => item.id);
        // console.log(filtersProductsTmp, "filterTNM");

        const categoriesProducts = Array.from(new Set(categoriesProductsTmp.flat()));
        // console.log(categoriesProducts);
        const filtersProducts = Array.from(new Set(filtersProductsTmp.flat()));
        // console.log(filtersProducts);

        const finalFIlterCategories = categoriesProducts.filter(item => filtersProducts.includes(item));


        // console.log(finalFIlterCategories, " const");


        const paginationResult = await this.productsService.getCountAndPagination(page, limit, search, field, type, finalFIlterCategories);
        // console.log(paginationResult, "paginationResult");
        const productSizesTmp = await Promise.all(paginationResult.products.map(async (item) => {
            const productSizes = await this.productsSizesRepository.findAll({ where: { idProduct: item.id } });
            const resultProducts = await this.calculatePrices(productSizes);
            // const productWithSizes = await Promise.all(productSizes.map(async (item) => {
            //     return await this.getProductSizeInfo(item.id);
            // }))
            return { products: item, productsSizes: resultProducts };
        }));
        // console.log(productSizesTmp, "productSizesTmp");
        return { count: paginationResult.count, products: productSizesTmp };
    }




    async createFullProduct(dto: CreateFullProductSizeDto, photo: File) {
        const prosuctsSizes = JSON.parse(`[${dto.productSize.toString()}]`) as CreateProductSizeSmallDto[];
        const categories = JSON.parse(`[${dto.categories.toString()}]`) as Category[];
        const filters = JSON.parse(`[${dto.filters.toString()}]`) as ItemFilter[];
        const product = await this.productsService.create({
            name: dto.name,
            description: dto.description,
            structure: dto.structure,
            idTypeProduct: dto.type
        }, [photo]);
        await Promise.all(prosuctsSizes.map(async (item) => {
            // console.log(item);
            return await this.productsSizesRepository.create({
                idProduct: product.id,
                idSize: item.idSize,
                paramsSize: item.paramsSize,
                prise: item.prise
            })
        }));
        await Promise.all(categories.map(async (item) => {
            return await this.categoriesProductService.create({
                idProduct: product.id,
                //@ts-ignore
                idCategory: item.id
            })
        }));

        await Promise.all(filters.map(async (item) => {

            return await this.productsItemsFilterService.create({
                idProduct: product.id,
                idItemFilter: item.id
            });

        }));

        return product;
    }

    async deleteProductWithSizes(productId: number): Promise<{ message: string }> {
        await this.productsSizesRepository.destroy({ where: { idProduct: productId } });
        await this.productsService.deleteProduct(productId);
        return { message: 'Product and all associated sizes deleted successfully' };
    }

    async getMaxPrice(idCategory?: number) {
        let productSize: ProductSize;
        if (idCategory) {
            productSize = await this.productsSizesRepository.findOne({
                order: [['extraPrice', 'DESC']],
                limit: 1,
                include: [{
                    model: CategoriesProductsSizes,
                    where: {
                        idCategory: idCategory
                    }
                  }]
            })
            console.log(productSize);
        }
        else {
            productSize = await this.productsSizesRepository.findOne({
                order: [['extraPrice', 'DESC']],
                limit: 1
            });
        }
        return productSize !== null ? productSize.extraPrice : 0;
    }
}
