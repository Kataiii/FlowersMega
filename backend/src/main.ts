import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder } from "@nestjs/swagger";
import { SwaggerModule } from "@nestjs/swagger/dist";
import { AppModule } from "./app.module";
// import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
// import * as cookieParser from 'cookie-parser';

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule)

    const  corsOptions = {
        origin: [process.env.CLIENT_URL, "http://localhost:3001"],
        methods: ['GET', 'HEAD', 'OPTIONS', 'PUT', 'POST', 'PATCH', 'DELETE'],
        credentials: true
    }

    const config = new DocumentBuilder()
        .setTitle('Flowers Mega')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    // const reflector = app.get(Reflector);
    // app.useGlobalGuards(new JwtAuthGuard(reflector));
    // app.use(cookieParser());
    app.enableCors(corsOptions)
    await app.listen(PORT, () => console.log(`Server start on port = ${PORT}`))
}

start()