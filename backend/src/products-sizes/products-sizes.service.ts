import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductSize } from './products-sizes.model';

@Injectable()
export class ProductsSizesService {
    constructor(
        @InjectModel(ProductSize) private productsSizesRepository: typeof ProductSize
    ){}

    // async create(dto: CreateProductDto){
    //     const product = await this.productsRepository.create({
    //         name: dto.name,
    //         description: dto.description,
    //         idTypeProduct: dto.idTypeProduct
    //     });
    //     dto.images.forEach( async(item) => {
    //         await this.imagesService.create({
    //             idProduct: product.id,
    //             image: item
    //         });
    //     })
    //     return await this.productsRepository.findOne({where: {id: product.id}, include: [{ all: true}]});
    // }

    // async getAll(){
    //     const products = await this.productsRepository.findAll({
    //         order: [["name", "ASC"]],
    //         include: [{
    //             model: Image
    //         }]
    //     })
    //     if(products.length === 0) throw new HttpException("Products not fount", HttpStatus.NOT_FOUND);
    //     return products;
    // }

    // async getById(id: number | string){
    //     const product = await this.productsRepository.findOne(
    //         {
    //             where: {id: id}, 
    //             include: [{
    //                 model: Image
    //             }]
    //         }
    //     );
    //     if(product === null) throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
    //     return product;
    // }
}
