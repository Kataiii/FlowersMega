import { useEffect, useState } from "react";
import { styled } from "styled-components";
import SecondaryButton from "../../shared/ui/button/SecondaryButton";
import Container from "../../shared/ui/containerMain/ContainerMain";
import TitleSection from "../../shared/ui/titleSection/TitleSection";
import { FullProductSizeDto, ProductSize, useProductsSizesControllerGetByCategotyIdWithPaginationQuery, useProductsSizesControllerGetPaginationQuery } from "../../store/product";
import { SmartProductCard } from "../product/SmartProductCart";

const Wrapper = styled.div`
    padding: 24px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    margin-left: 50px;
`;

export const BlockGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(286px, 1fr));
    gap: 18px; 
`

const BlockProducts: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(6);
    const { isLoading, data } = useProductsSizesControllerGetByCategotyIdWithPaginationQuery({ page: page, limit: pageSize });
    const [productsSizes, setProductSizes] = useState<FullProductSizeDto[]>([]);


    useEffect(() => {
        if (!isLoading && data?.products) {
            setProductSizes(data.products);
        }
    }, [data, isLoading]);


    const clickHandler = () => {
        const allPages = Math.ceil((data?.count ?? 0) / pageSize);
        if (page < allPages) {
            setPage(prevPage => prevPage + 1);
        }
    };

    return (
        <Container>
            <TitleSection content="Популярные товары" />
            <Wrapper>
                <BlockGrid>
                    {
                        isLoading
                            ? <p>Загрузка...</p>
                            : data && productsSizes.map((item, index) => (
                                <SmartProductCard key={`productSizes-${index}`} product={item} />
                            ))
                    }
                </BlockGrid>
                {
                    (data?.count ?? -1) > productsSizes.length
                        ? <div style={{ width: "10%", margin: "0 auto" }}>
                            <SecondaryButton buttonContent={"Загрузить еще"} clickHandler={clickHandler} />
                        </div>
                        : null
                }
            </Wrapper>
        </Container>
    )
}

export default BlockProducts;