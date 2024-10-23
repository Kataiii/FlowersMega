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

@Injectable()
export class ProductsSizesFullService {
    constructor(
        @InjectModel(ProductSize) private productsSizesRepository: typeof ProductSize,
        private productsService: ProductsService,
        private sizesService: SizesService,
        private reviewsService: ReviewsService,
        private categoriesProductService: CategoriesProductsService,
        private productsItemsFilterService: ProductsItemsFilterService,
        private extraPriceService: ExtraPriceService
    ) { }

    async onModuleInit() {
        await this.seeds();
    }

    async seeds() {

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

    async getProductsSizesForCardPagination(page: number, limit: number, search?: string, filterItems?: number[], minPrice?: number, maxPrice?: number, category?: number) {
        console.log(filterItems, "filterItems");
        console.log(category, "LMAO uAPL");
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
        if (minPrice) {
            whereCondition.prise = { [Op.gte]: minPrice };
        }
        if (maxPrice) {
            whereCondition.prise = {
                ...whereCondition.prise,
                [Op.lte]: maxPrice
            };
        }
        const count = await this.productsSizesRepository.findAndCountAll();

        const products = await this.productsSizesRepository.findAll({
            where: whereCondition,
            limit: limit,
            offset: (page - 1) * limit,
        });
        const updatedProducts = await this.calculatePrices(products);
        // console.log(minPrice, maxPrice, "LOW MAX PRICE")
        const result = updatedProducts.filter(item => {
            // console.log(`Checking item: ${JSON.stringify(item.productSize.prise)}`);
            if (maxPrice) return item.productSize.prise > 0 && item.productSize.prise < maxPrice;
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
        const filters = JSON.parse(`[${dto.filters.toString()}]`) as FilterWithItems[];
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
            return await Promise.all(item.tags.map(async (itemTags) => {
                return await this.productsItemsFilterService.create({
                    idProduct: product.id,
                    idItemFilter: itemTags.id
                });
            }));
        }));

        return product;
    }

    async deleteProductWithSizes(productId: number): Promise<{ message: string }> {
        await this.productsSizesRepository.destroy({ where: { idProduct: productId } });
        await this.productsService.deleteProduct(productId);
        return { message: 'Product and all associated sizes deleted successfully' };
    }

    async getMaxPrice(idCategory?: number) {
        if (idCategory) {
            const productsByCategory = await this.categoriesProductService.getProductsByCategoryId(idCategory);
        } else {
            // console.log("idCategory is undefined");
        }

        const productSize = await this.productsSizesRepository.findAll({
            order: [['prise', 'DESC']]
        });

        const productSizeUpd = await this.calculatePrices(productSize);
        // console.log(productSizeUpd[0].productSize.prise, "FINALLLYYY");
        return productSizeUpd[0].productSize.prise;
    }

}
