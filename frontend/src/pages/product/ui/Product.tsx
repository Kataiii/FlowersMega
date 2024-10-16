import { Image } from "antd";
import { useLocation, useParams } from "react-router-dom";
import Container from "../../../shared/ui/containerMain/ContainerMain";
import { API_URL } from "../../../shared/utils/constants";
import { FullProductSizeDto, useProductsControllerGetByIdQuery, useProductsSizesControllerGetByProductIdAndSizeIdQuery } from "../../../store/product";
import { useSizesControllerGetAllQuery } from "../../../store/size";
import Error from "../../../shared/assets/no-image.png";
import GaleryPhotoProduct from "../../../widgets/product/GaleryPhotoProduct";
import DescriptionProduct from "../../../widgets/product/DescriptionProduct";
import BlockReviewProduct from "../../../widgets/blockReviewProduct/BlockReviewProduct";
import BlockProductsExtras from "../../../widgets/blockProducts/BlockProductsExtras";

const Product: React.FC = () => {
    const {name, size} = useParams();
    const {state} = useLocation();
    const { idProduct, idSize } = state;
    const { isLoading, data } = useProductsControllerGetByIdQuery({ id: idProduct });
    const productSize = useProductsSizesControllerGetByProductIdAndSizeIdQuery({idProduct: idProduct, idSize: idSize});

    return (
        <>
            {
                isLoading || productSize.isLoading
                ? <p>Загрузка...</p>
                :<div style={{ display: "flex", justifyContent: "center", padding: "25px 0" }}>
                <Container>
                    <h1 style={{fontFamily: "Inter", fontSize: 32, fontWeight: 600, color: "var(--secondary-text-color)"}}>{data?.name}</h1>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <GaleryPhotoProduct product={data}/>
                        <DescriptionProduct product={{...data!, productSize: productSize.data!}}/>
                    </div>
                    <BlockProductsExtras/>
                    <BlockReviewProduct idProductSize={productSize.data?.id ?? -1}/>
                </Container>
            </div>
            }
        </>
    )
}

export default Product;