export enum Products {
    PRODUCT = "товар",
    SEVERAL_PRODUCTS = "товара",
    MANY_PARODUCTS = "товаров"
}

export enum Reviews{
    REVIEW = "отзыв",
    SEVERAL_REVIEWS = "отзыва",
    MANY_REVIEWS = "отзывов"
}

export class Numerals{
    public static numeralsProducts(numeral: number){
        if(numeral == 1) return Products.PRODUCT;
        if(numeral > 1 && numeral < 5) return Products.SEVERAL_PRODUCTS;
        return Products.MANY_PARODUCTS;
    }

    public static numeralsReviews(numeral: number){
        if(numeral == 1) return Reviews.REVIEW;
        if(numeral > 1 && numeral < 5) return Reviews.SEVERAL_REVIEWS;
        return Reviews.MANY_REVIEWS;
    }
}