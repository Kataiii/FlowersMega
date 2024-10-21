import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSizeDto } from './dto/createSize.dto';
import { Size } from './sizes.model';

@Injectable()
export class SizesService {
    constructor(@InjectModel(Size) private sizesRepository: typeof Size) { }

    async create(dto: CreateSizeDto) {
        return await this.sizesRepository.create(dto);
    }

    async getAll() {
        const sizes = await this.sizesRepository.findAll({
            order: [["name", "ASC"]]
        })
        if (sizes.length === 0) throw new HttpException("Sizes not fount", HttpStatus.NOT_FOUND);
        return sizes;
    }

    async getById(id: number | string) {
        const size = await this.sizesRepository.findOne({ where: { id: id } });
        if (size === null) throw new HttpException("Size not found", HttpStatus.NOT_FOUND);
        return size;
    }

    async delete(id: number) {
        const size = await this.sizesRepository.findOne({ where: { id: id } });
        await this.sizesRepository.destroy({ where: { id: id } });
        return size;
    }
}
