import { Image } from "antd";
import { API_URL } from "../../../../shared/utils/constants";
import { CartProduct } from "../../../cart/types";
import Error from "../../../../shared/assets/no-image.png";
import { Text } from "../../../../shared/ui/forAdditionalPages/Content";

type ProductOrderProps = {
    product: CartProduct;
}

const ProductOrder: React.FC<ProductOrderProps> = ({product}) => {
    return(
        <div style={{ display: "flex", gap: 10}}>
            {/* @ts-ignore */}
            <Image  src={`${API_URL}/products/images/${product.idProduct}/${product.product?.images[0].url}`}
                    width={108}
                    height={108}
                    fallback={Error}/> 
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", gap: 16}}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", gap: 4}}>
                    <Text style={{fontSize: 16, fontWeight: 400}}>{product.product.name}</Text>
                    <Text style={{fontSize: 12, fontWeight: 400, color: "var(--text-modal)"}}>{product.paramsSize}</Text>
                </div>
                <div style={{display: "flex", gap: 5, alignItems: "center"}}>
                    <Text style={{display: "inline", fontSize: 20, fontWeight: 600}}>{product.prise} ₽</Text>
                    <Text style={{display: "inline", fontSize: 16, fontWeight: 400, color: "var(--text-modal)"}}>× {product.count}</Text>
                </div>
            </div>
        </div>
    )
}

export default ProductOrder;