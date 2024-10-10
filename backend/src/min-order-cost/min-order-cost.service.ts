import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MinOrderCost } from './min-order-cost.model';

@Injectable()
export class MinOrderCostService {
    constructor(
        @InjectModel(MinOrderCost) private minOrderCostRespository: typeof MinOrderCost,
    ) { }

    async create(minOrderCost: MinOrderCost) {
        const newMinOrderCost = await this.minOrderCostRespository.create(minOrderCost);
        return newMinOrderCost;
    }

    async get() {
        return await this.minOrderCostRespository.findAll();
    }
}
