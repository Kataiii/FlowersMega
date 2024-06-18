import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductsService } from 'src/products/products.service';
import { SizesService } from 'src/sizes/sizes.service';
import { CreateProductSizeDto, CreateProductSizeInfoDto } from './dto/createProductsSizes.dto';
import { ProductSize } from './products-sizes.model';

@Injectable()
export class ProductsSizesService {
    constructor(
        @InjectModel(ProductSize) private productsSizesRepository: typeof ProductSize,
        private productsService: ProductsService,
        private sizesService: SizesService
    ){}

    async create(dto: CreateProductSizeDto | CreateProductSizeInfoDto){
        if("product" in dto){
            const product = await this.productsService.create(dto.product);
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

    async getAll(){
        const productsSizes = await this.productsSizesRepository.findAll({
            order: [["idProduct", "ASC"]],
            include: [{
                all: true
            }]
        })
        if(productsSizes.length === 0) throw new HttpException("Products sizes not fount", HttpStatus.NOT_FOUND);
        return productsSizes;
    }

    async getById(id: number | string){
        const productSize = await this.productsSizesRepository.findOne(
            {
                where: {id: id}, 
                include: [{
                    all: true
                }]
            }
        );
        if(productSize === null) throw new HttpException("Product size not found", HttpStatus.NOT_FOUND);
        return productSize;
    }

    async getByProductId(idProduct: string | number){
        const productsSizes = await this.productsSizesRepository.findAll(
            {where: {
                idProduct: idProduct
            },
            order: [["price", "ASC"]],
            include: [{
                all: true
            }]}
        );

        if(productsSizes === null) throw new HttpException("Products sizes not found", HttpStatus.NOT_FOUND);
        return productsSizes;
    }
}
