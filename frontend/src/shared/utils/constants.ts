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
export const ORDER_SUCCESS_PATH = "/order_success";
export const ORDER_CALL_PATH = "/order_call";

export const SEARCH_PATH = "/search/q?=:query";
export const CATEGORY_PATH = "/category";
export const FILTERS_PATH = "/filters?=:filters";

export const ADMIN_PATH = "/admin";
export const ADMIN_ORDER_PATH = "/admin/order/:id";
export const ADMIN_PRODUCTS_PATH = "/admin/products";
export const ADMIN_PRODUCT_PATH = "/admin/product/:id";
export const ADMIN_REVIEWS_PATH = "/admin/reviews";
export const ADMIN_REVIEW_PATH = "/admin/review/:id";
export const ADMIN_LOGIN = "/admin/login";

// export const API_URL = "http://luckyflora.ru/api/";
export const API_URL = "http://localhost:5000";

export const PHONE = "8 986 986 99 96";
export const EMAIL = "info.luckyflora@mail.ru";

export enum targetA {
    _blank = "_blank",
    _self = "_self",
}

export const mapBreads = new Map<string, string>([
    ["/", "Главная"],
    [CATALOG_PATH, "Каталог"],
    [PROFILE_PATH, "Личный кабинет"],
    [ORDERS_PATH, "Заказы"],
    [CART_PATH, "Корзина"],
    ['/order', "Оформить заказ"],
    [FAVOURITES_PATH, "Избранное"],
    [PAYMENT_DELIVERY_PATH, "Оплата и доставка"],
    [ABOUT_PATH, "О нас"],
    [CONTACTS_PATH, "Контакты"],
    [HELP_PATH, "Помощь"],
    [POLITICS_PATH, "Политика конфиденциальности"],
    ["/orders", "Заказы"]
]);