import { CartProduct } from "../../entities/cart/types"
import { CartCountController } from "../../features/cart-count-controller/CartCountController"
import { DeleteFromCartButton } from "../../features/delete-from-cart/DeleteFormCartButton"
import { API_URL } from "../../shared/utils/constants"


type CartProductCardProps = {
    product: CartProduct
}
export const CartProductCard: React.FC<CartProductCardProps> = ({ product }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            borderTop: "1px solid var(--secondary-bg-color)" ,
            borderBottom:"1px solid var(--secondary-bg-color)",
            width: "100%",
            padding: "15px 0",
            justifyContent: "space-between"
        }}>
            <div style={{display: " flex", gap: 32}}>
                {/* @ts-ignore */}
                <img style={{width: 106, height: 106, borderRadius: 6}} src={`${API_URL}/products/images/${product.idProduct}/${product.product?.images[0].url}`} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 5 }}>
                    <div style={{fontFamily: "Inter", fontWeight: 400, fontSize: 20, color: "var(--secondary-text-color)"}}>{product.product.name}</div>
                    <div style={{fontFamily: "Inter", fontWeight: 400, fontSize: 16, color: "var(--unactive-text-color)"}}>Размер букета: {product.paramsSize}</div>
                </div>
            </div>
            <CartCountController id={product.id ?? -1} />
            <div style={{display: "flex", gap: 8, padding: "0 8px", alignItems: "center"}}>
                <div style={{display: "flex", gap: 5, alignItems: "center"}}>
                    <p style={{fontFamily: "Inter", fontSize: 15, fontWeight: 400, color: "var(--secondary-text-color)"}}>{product.prise.toLocaleString()} ₽ × {product.count} шт. = </p>
                    <p style={{fontFamily: "Inter", fontSize: 24, fontWeight: 400, color: "var(--secondary-text-color)"}}>{(product.prise * product.count).toLocaleString()} ₽</p>
                </div>
                <DeleteFromCartButton id={product.id} />
            </div>
        </div>
    )
}