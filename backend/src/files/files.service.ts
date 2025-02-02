import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
    constructor() { }

    async createFile(file, expansionFile: string, nameFolder: string, pathForFolder: string[]): Promise<string> {
        try {
            if (!file || !file.buffer) {
                throw new Error('File buffer is undefined');
            }

            const fileName = uuid.v4() + expansionFile;
            let filePath = path.resolve(__dirname, '..', '..', 'static', ...pathForFolder, nameFolder);

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
        } catch (e) {
            console.log(e);
            throw new HttpException('An error occurred while writing files', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createImageProduct(file, idProduct: number) {
        return await this.createFile(
            file,
            file.originalname ? file.originalname.slice(file.originalname.lastIndexOf('.'), file.originalname.length) : file.name,
            idProduct.toString(),
            ["products", "images"]
        );
    }

    async createImageReview(file, idProduct: number) {
        return await this.createFile(
            file,
            file.originalname.slice(file.originalname.lastIndexOf('.'), file.originalname.length),
            idProduct.toString(),
            ["products", "images_reviews"]
        );
    }

    async createAvatar(file, idUser: number) {
        return await this.createFile(
            file,
            file.originalname.slice(file.originalname.lastIndexOf('.'), file.originalname.length),
            "users",
            []
        );
    }

    async createImageCategory(file, categoryId: string) {
        return await this.createFile(
            file,
            file.originalname ? file.originalname.slice(file.originalname.lastIndexOf('.')) : file.name,
            categoryId,
            ["categories"]
        );
    }


    async deleteAvatar(fileName: string, idUser: number) {
        const filePath = path.resolve(__dirname, '..', '..', 'static', 'users', fileName);
        return await fs.unlink(filePath, (error) => {
            if (error) console.log(error);
        });
    }

    async updateImage(fileName: string, productId: string, file){
        const filePath = path.resolve(__dirname, '..', '..', 'static', "products", "images", productId, fileName);
        await fs.unlink(filePath, (error) => {
            if(error) console.log(error);
        })
        fs.writeFileSync(filePath, file.buffer);
        return fileName;
    }
}
