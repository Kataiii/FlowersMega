import { Image } from "antd";
import Error from "../../shared/assets/no-image.png";
import { API_URL } from "../../shared/utils/constants";
import { Product } from "../../store/product";

type GaleryPhotoProductProps = {
    product?: Product;
}

const GaleryPhotoProduct: React.FC<GaleryPhotoProductProps> = ({product}) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "45%" }}>
            {/* @ts-ignore */}
            <Image fallback={Error} style={{ width: "100%", borderRadius: 6 }} src={`${API_URL}/products/images/${product?.id}/${product?.images[0].url}`} alt="image1" />
            <div style={{ display: "flex", width: 568, gap: 20 }}>
                {
                    //@ts-ignore
                    product?.images.map((item, index) => {
                        if (index === 0) return;
                        return <Image fallback={Error} style={{ width: 124, height: 124, borderRadius: 6 }} src={`${API_URL}/products/images/${product?.id}/${item.url}`} key={index} alt={index} />
                    })
                }
            </div>
        </div>
    );
}

export default GaleryPhotoProduct;