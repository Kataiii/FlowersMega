import { Module } from '@nestjs/common';
import { MinOrderCostService } from './min-order-cost.service';
import { MinOrderCostController } from './min-order-cost.controller';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { MinOrderCost } from './min-order-cost.model';

@Module({
    providers: [MinOrderCostService],
    controllers: [MinOrderCostController],
    imports: [
        SequelizeModule.forFeature([MinOrderCost]),
    ],
    exports: [MinOrderCostService],
})
export class MinOrderCostModule { }
