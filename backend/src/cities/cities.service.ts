import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { City } from './cities.model';

@Injectable()
export class CitiesService {
    constructor(@InjectModel(City) private cityRepository: typeof City){}

    async getAll(){
        const cities = await this.cityRepository.findAll({
            order: [["name", "ASC"]]
        })
        if(cities.length === 0) throw new HttpException("Cities not fount", HttpStatus.NOT_FOUND);
        return cities;
    }

    async getById(id: number | string){
        const city = await this.cityRepository.findOne({where: {id: id}});
        if(city === null) throw new HttpException("City not found", HttpStatus.NOT_FOUND);
        return city;
    }
}
