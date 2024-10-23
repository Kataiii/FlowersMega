import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductsService } from 'src/products/products.service';
import { SizesService } from 'src/sizes/sizes.service';
import { CreateProductSizeDto, CreateProductSizeInfoDto } from './dto/createProductsSizes.dto';
import { ProductSize } from './products-sizes.model';
import { ExtraPriceService } from 'src/extra-price/extra-price.service';
import { ProductsSizesFullService } from './products-sizes-full.service';
import { ProductSizeCreationAttrs } from './products-sizes.model'

@Injectable()
export class ProductsSizesService {
    constructor(
        @InjectModel(ProductSize) private productsSizesRepository: typeof ProductSize,
        private productsService: ProductsService,
        private sizesService: SizesService,
        private extraPriceForCategories: ExtraPriceService
    ) { }

    async create(dto: CreateProductSizeDto | CreateProductSizeInfoDto) {
        if ("product" in dto) {
            const product = await this.productsService.create(dto.product, []);
            const size = await this.sizesService.create(dto.size);

            return await this.productsSizesRepository.create({
                idProduct: product.id,
                idSize: size.id,
                paramsSize: dto.paramsSize,
                count: dto.count,
                prise: dto.prise
            });
        }

        return await this.productsSizesRepository.create(dto);
    }

    async getAll() {
        const productsSizes = await this.productsSizesRepository.findAll({
            order: [["idProduct", "ASC"]],
            include: [{
                all: true
            }]
        })
        if (productsSizes.length === 0) throw new HttpException("Products sizes not fount", HttpStatus.NOT_FOUND);
        return productsSizes;
    }

    async getAllWithPagination(page: number, limit: number, field?: string, type?: string) {
        const count = (await this.productsSizesRepository.findAndCountAll()).count;
        const order = field && type ? [[field, type]] : [['updatedAt', 'ASC']];
        const productsSizes = await this.productsSizesRepository.findAll({
            limit: limit,
            offset: (page - 1) * limit,
            order: [field, type],
        });
        return {
            count: count,
            productsSizes: productsSizes
        };
    }

    async getById(id: number | string) {
        const productSize = await this.productsSizesRepository.findOne(
            {
                where: { id: id },
                include: [{
                    all: true
                }]
            }
        );
        // if (productSize === null) throw new HttpException("Product size not found", HttpStatus.NOT_FOUND);
        return productSize;
    }

    async getByProductId(idProduct: string | number) {
        const extraPriceForCategories = await this.extraPriceForCategories.whichOneTheBest();
        const productsSizes = await this.productsSizesRepository.findAll(
            {
                where: {
                    idProduct: idProduct
                },
                order: [["prise", "ASC"]]
            }
        );
        const productsCardInfo = await Promise.all(productsSizes.map(async (item) => {
            const product = await this.productsService.getById(item.idProduct);
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
                product: product

            }

        }));
        // console.log(productsCardInfo, "WANNA CHECK");

        const updatedProducts = productsCardInfo.map(item => {

            const productSize = { ...item.productSize };

            const categories = item.product.categories || [];
            let priceMultiplier = extraPriceForCategories.get('all') || 0;

            if (categories.length === 0) {
                priceMultiplier = extraPriceForCategories.get('all') || priceMultiplier;
            } else if (categories.length === 1) {
                priceMultiplier = extraPriceForCategories.get(categories[0].id.toString()) || priceMultiplier;
            } else {
                const multipliers = categories.map(cat => extraPriceForCategories.get(cat.id.toString()) || priceMultiplier);
                priceMultiplier = Math.max(...multipliers);
            }
            // console.log("Old price:", productSize.prise);
            // console.log("Price multiplier:", priceMultiplier);

            const updatedPrice = Math.floor(productSize.prise + (productSize.prise / 100) * priceMultiplier);

            // console.log("New price:", updatedPrice);
            return {
                ...item,
                productSize: {
                    ...productSize,
                    prise: updatedPrice,
                }
            };
        });
        // console.log(updatedProducts, "LMAO?");
        if (productsSizes === null) throw new HttpException("Products sizes not found", HttpStatus.NOT_FOUND);
        return updatedProducts;
    }

    async getMaxPrice() {
        const productSize = await this.productsSizesRepository.findAll({
            order: [['prise', 'DESC']]
        });
        return productSize[0].prise;
    }

    async getWithAllSizes(id: number | string) {

        const productSizes = await this.getByProductId(id);

        const info = await Promise.all(productSizes.map(async (item) => {
            const size = await this.sizesService.getById(item.productSize.idSize);
            const prodSize = item.productSize;
            return { size, prodSize };
        }));

        const productsSizes = info.map(item => item.prodSize);
        const sizes = info.map(item => item.size);

        return {
            productsSizes,
            sizes
        };
    }


    async getBySizeIdByProductId(idSize: number, idProduct: number) {
        const productSize = await this.productsSizesRepository.findOne({
            where: {
                idProduct: idProduct,
                idSize: idSize
            }
        });
        const productSizesUpd = await this.getByProductId(productSize.idProduct);
        // console.log(productSizesUpd, "YAAAAAAAAAAAAAAa");
        // console.log(productSize, "PROOOOOOOOOOOOOOOOOOOOOOOOD");

        const updatedProductSize = productSizesUpd.find(
            (item) => {
                // console.log(item.productSize.idSize, "HHHH");
                // console.log(Number(idSize), "IDSIIIIIIIIIZE");
                const isMatch = item.productSize.idSize === Number(idSize) && item.productSize.idProduct === Number(idProduct);
                // console.log(isMatch, "LLLLLLLL");
                return isMatch;
            }
        );

        // console.log(updatedProductSize, "WWWWWWWWWWWWWWWWWWWWWWwwww");
        return updatedProductSize.productSize
    }
}
