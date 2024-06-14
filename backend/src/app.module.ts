import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { CitiesModule } from './cities/cities.module';
import { UsersModule } from './users/users.module';
import { FiltersModule } from './filters/filters.module';
import { ItemsFilterModule } from './items-filter/items-filter.module';
import { CategoriesModule } from './categories/categories.module';
import { TypesProductModule } from './types-product/types-product.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT) || 5432,
            username: String(process.env.POSTGRES_USER),
            password: String(process.env.POSTGRES_PASSWORD),
            database: process.env.POSTGRES_DB,
            models: [],
            autoLoadModels: true
          }),
        CitiesModule,
        UsersModule,
        FiltersModule,
        ItemsFilterModule,
        CategoriesModule,
        TypesProductModule,
    ]
})
export class AppModule{}