export enum Products {
    PRODUCT = "товар",
    SEVERAL_PRODUCTS = "товара",
    MANY_PARODUCTS = "товаров"
}

export class Numerals{
    public static numeralsProducts(numeral: number){
        if(numeral == 1) return Products.PRODUCT;
        if(numeral > 1 && numeral < 5) return Products.SEVERAL_PRODUCTS;
        return Products.MANY_PARODUCTS;
    }
}