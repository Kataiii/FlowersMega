import { City } from "../../store/city";

export class Filters{
    public static filtersCities(items: City[], value: string){
        if(value === "") return items;
        const cities = items.filter(item => item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
        return cities;
    }
}