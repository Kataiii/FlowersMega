import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { CitiesModule } from './cities/cities.module';
import { UsersModule } from './users/users.module';
import { FiltersModule } from './filters/filters.module';
import { ItemsFilterModule } from './items-filter/items-filter.module';
import { CategoriesModule } from './categories/categories.module';
import { TypesProductModule } from './types-product/types-product.module';
import { ProductsModule } from './products/products.module';
import { SizesModule } from './sizes/sizes.module';
import { ImagesModule } from './images/images.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { FilesModule } from './files/files.module';
import * as path from "path";
import { ProductsItemsFilter } from "./products-items-filter/products-items-filter.model";
import { CategoriesProducts } from "./categories-products/categories_products.model";
import { ProductsSizesModule } from './products-sizes/products-sizes.module';
import { OrderModule } from './order/order.module';
import { OrdersProductsSizesModule } from './orders-products-sizes/orders-products-sizes.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ImagesReviewsModule } from './images-reviews/images-reviews.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { CategoriesProductsModule } from './categories-products/categories-products.module';
import { TgBotModule } from './tg-bot/tg-bot.module';
import { SeedsModule } from './seeds/seeds.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, '..', 'static'),
            exclude: ['/(.*)']
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT) || 5432,
            username: String(process.env.POSTGRES_USER),
            password: String(process.env.POSTGRES_PASSWORD),
            database: process.env.POSTGRES_DB,
            models: [
                ProductsItemsFilter,
                CategoriesProducts
            ],
            autoLoadModels: true
          }),
        CitiesModule,
        UsersModule,
        FiltersModule,
        ItemsFilterModule,
        CategoriesModule,
        TypesProductModule,
        ProductsModule,
        SizesModule,
        ImagesModule,
        FilesModule,
        ProductsSizesModule,
        OrderModule,
        OrdersProductsSizesModule,
        ReviewsModule,
        ImagesReviewsModule,
        TokensModule,
        AuthModule,
        CategoriesProductsModule,
        TgBotModule,
        SeedsModule,
    ]
})
export class AppModule{}