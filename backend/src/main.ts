import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder } from "@nestjs/swagger";
import { SwaggerModule } from "@nestjs/swagger/dist";
import { AppModule } from "./app.module";
import * as fs from "fs";
import * as cookieParser from "cookie-parser";

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule)

    const  corsOptions = {
        origin: "*",
        methods: ['GET', 'HEAD', 'OPTIONS', 'PUT', 'POST', 'PATCH', 'DELETE'],
        credentials: true
    }

    const config = new DocumentBuilder()
        .setTitle('Flowers Mega')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'Authorization',
            in: 'header',
          }, 'access-token')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document);
    // fs.writeFileSync('../frontend/src/swagger.json', JSON.stringify(document))

    app.use(cookieParser());
    app.enableCors(corsOptions)
    await app.listen(PORT, () => console.log(`Server start on port = ${PORT}`))
}

start()