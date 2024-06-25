import { useEffect, useState } from "react";
import { styled } from "styled-components";
import SecondaryButton from "../../shared/ui/button/SecondaryButton";
import Container from "../../shared/ui/containerMain/ContainerMain";
import TitleSection from "../../shared/ui/titleSection/TitleSection";
import { ProductSize, useProductsSizesControllerGetPaginationQuery } from "../../store/product";
import { SmartProductCard } from "../product/SmartProductCart";

const Wrapper = styled.div`
    padding: 24px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
`;

const BlockProducts: React.FC = () => {
    const [page,setPage] = useState<number>(1);
    const [productsSizes, setProductSizes] = useState<ProductSize[]>([]);
    const {isLoading, data} = useProductsSizesControllerGetPaginationQuery({page: page, limit: 6});

    useEffect(() => {
        if(!isLoading){
            setProductSizes(data?.productsSizes ?? []);
        }
    }, [isLoading]);

    const clickHandler = () => {
        const allPages = Math.floor((data?.count ?? -1) / 6);
        if(page <= allPages){
            setPage(page => page + 1);
            if(!isLoading){
                setProductSizes([...productsSizes, ...data?.productsSizes ?? []]);
            }
        }
    }

    return(
        <Container>
            <TitleSection content="Популярные товары"/>
            <Wrapper>
                <div style={{display: "flex", gap: "18px", flexWrap: "wrap"}}>
                {
                    isLoading
                    ? <p>Загрузка...</p>
                    : data && productsSizes.map((item, index) => {
                        return <SmartProductCard key={`productSizes-${index}`} size={item} />
                    })
                }
                </div>
                {
                    (data?.count ?? -1) > productsSizes.length
                    ?   <div style={{width: "10%", margin: "0 auto"}}>
                            <SecondaryButton buttonContent={"Загрузить еще"} clickHandler={clickHandler}/>
                        </div>
                    : null
                }
            </Wrapper>
        </Container>
    )
}

export default BlockProducts;