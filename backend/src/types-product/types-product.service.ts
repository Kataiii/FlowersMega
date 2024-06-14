import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTypeProductDto } from './dto/createTypeProduct.dto';
import { TypeProduct } from './types-product.model';

@Injectable()
export class TypesProductService {
    constructor(@InjectModel(TypeProduct) private typeProductRepository: typeof TypeProduct){}

    async create(dto: CreateTypeProductDto){
        return await this.typeProductRepository.create(dto);
    }

    async getAll(){
        const typesProduct = await this.typeProductRepository.findAll({
            order: [["name", "ASC"]]
        })
        if(typesProduct.length === 0) throw new HttpException("Types product not fount", HttpStatus.NOT_FOUND);
        return typesProduct;
    }

    async getById(id: number | string){
        const typeProduct = await this.typeProductRepository.findOne({where: {id: id}});
        if(typeProduct === null) throw new HttpException("Type product not found", HttpStatus.NOT_FOUND);
        return typeProduct;
    }
}
