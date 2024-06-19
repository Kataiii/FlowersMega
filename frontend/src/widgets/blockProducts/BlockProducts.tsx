import { useEffect } from "react";
import CardProduct from "../../entities/product/ui/cardProduct/CardProduct";
import Container from "../../shared/ui/containerMain/ContainerMain";
import TitleSection from "../../shared/ui/titleSection/TitleSection";
import { useProductsSizesControllerGetAllQuery } from "../../store/product";
import { SmartProductCard } from "../product/SmartProductCart";

const BlockProducts: React.FC = () => {
    const {isLoading, data} = useProductsSizesControllerGetAllQuery();

    return(
        <Container>
            <TitleSection content="Популярные товары"/>
            <div style={{display: "flex", gap: "18px", flexWrap: "wrap"}}>
            {
                isLoading
                ? <p>Загрузка...</p>
                : data && data.map((item, index) => {
                    return <SmartProductCard size={item} />
                })
            }
            </div>
        </Container>
    )
}

export default BlockProducts;