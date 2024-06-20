
import { Product, ProductSize } from "../../store/product";

export type CartProduct = ProductSize & {count: number, product: Product};