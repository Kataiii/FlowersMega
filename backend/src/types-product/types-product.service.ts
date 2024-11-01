import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTypeProductDto } from './dto/createTypeProduct.dto';
import { TypeProduct } from './types-product.model';

@Injectable()
export class TypesProductService {
    constructor(@InjectModel(TypeProduct) private typeProductRepository: typeof TypeProduct) { }

    async onModuleInit() {
        await this.seeds();
    }

    async seeds() {
        const typesProduct = [
            { name: 'Цветы в коробке' },
            { name: 'Букеты' },
            { name: 'Корзина с цветами' },
            { name: 'Букет из Роз' }
        ];

        for (const typeProduct of typesProduct) {
            await this.typeProductRepository.findOrCreate({
                where: { name: typeProduct.name },
                defaults: typeProduct,
            });
        }
    }

    async create(dto: CreateTypeProductDto) {
        return await this.typeProductRepository.create(dto);
    }

    async getAll() {
        const typesProduct = await this.typeProductRepository.findAll({
            order: [["name", "ASC"]]
        })
        if (typesProduct.length === 0) throw new HttpException("Types product not fount", HttpStatus.NOT_FOUND);
        return typesProduct;
    }

    async getTypeProductByName(name: string): Promise<number | null> {
        const typeProduct = await this.typeProductRepository.findOne({
            where: { name },
        });

        if (!typeProduct) {
            console.log('TypeProduct not found:', name);
            return null;
        }

        return typeProduct.id;
    }


    async getById(id: number | string) {
        const typeProduct = await this.typeProductRepository.findOne({ where: { id: id } });
        if (typeProduct === null) throw new HttpException("Type product not found", HttpStatus.NOT_FOUND);
        return typeProduct;
    }
}
