export const HOME_PATH: string = "/";
export const CATALOG_PATH: string = "/catalog";
export const PRODUCT_PATH = "/product";
export const PROFILE_PATH = "/profile";
export const ORDERS_PATH = "/profile/orders";
export const CART_PATH = "/cart";
export const CART_ORDER_PATH = "/cart/order";
export const FAVOURITES_PATH = "/favourites";
export const PAYMENT_DELIVERY_PATH = "/payment_and_delivery";
export const ABOUT_PATH = "/about_us";
export const CONTACTS_PATH = "/contacts";
export const HELP_PATH = "/help";
export const POLITICS_PATH = "/politics";

export const REGIST_PATH = "/regist";
export const AUTH_PATH = "/auth";
export const RECOVERY_PASSWORD_PATH = "/recovery_password";
export const EMAIL_PATH = "/email";
export const CITIES_PATH = "/cities";
export const FAST_BUY_PATH = "/fast_buy";
export const CHANGE_PASSWORD_PATH = "/change_password";
export const DELETE_PROFILE_PATH = "/delete_profile";
export const ORDER_SUCCESS_PATH = "/order_success";
export const ORDER_CALL_PATH = "/order_call";

export const SEARCH_PATH = "/search/q?=:query";
export const CATEGORY_PATH = "/category";
export const FILTERS_PATH = "/filters?=:filters";

export const API_URL = "http://localhost:5000";

export const PHONE = "8 800 000 00 00";
export const EMAIL = "info@flowersmega.ru";

export enum targetA{
    _blank,
    _self
}

export const mapBreads = new Map<string, string>([
    ["/", "Главная"],
    [CATALOG_PATH, "Каталог"],
    [PROFILE_PATH, "Личный кабинет"],
    [ORDERS_PATH, "Заказы"],
    [CART_PATH, "Корзина"],
    [CART_ORDER_PATH, "Оформить заказ"],
    [FAVOURITES_PATH, "Избранное"],
    [PAYMENT_DELIVERY_PATH, "Оплата и доставка"],
    [ABOUT_PATH, "О нас"],
    [CONTACTS_PATH, "Контакты"],
    [HELP_PATH, "Помощь"],
    [POLITICS_PATH, "Политика конфиденциальности"]
]);