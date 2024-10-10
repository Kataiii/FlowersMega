import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MinOrderCost } from './min-order-cost.model';

@Injectable()
export class MinOrderCostService {
    constructor(
        @InjectModel(MinOrderCost) private minOrderCostRespository: typeof MinOrderCost,
    ) { }

    async upsert(minOrderCostDto: MinOrderCost) {
        const [minOrderCost, created] = await this.minOrderCostRespository.findOrCreate({
            where: {},
            defaults: minOrderCostDto,
        });

        if (!created) {
            minOrderCost.value = minOrderCostDto.value;
            await minOrderCost.save();
        }

        return minOrderCost;
    }

    async get() {
        return await this.minOrderCostRespository.findAll();
    }

    async remove(id: number): Promise<void> {
        const result = await this.minOrderCostRespository.destroy({
            where: { id },
        });

        if (result === 0) {
            throw new NotFoundException(`MinOrderCost with id ${id} not found`);
        }
    }
}
