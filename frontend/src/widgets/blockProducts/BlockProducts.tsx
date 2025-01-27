import { useEffect, useState } from "react";
import { styled } from "styled-components";
import SecondaryButton from "../../shared/ui/button/SecondaryButton";
import Container from "../../shared/ui/containerMain/ContainerMain";
import TitleSection from "../../shared/ui/titleSection/TitleSection";
import { FullProductSizeDto, ProductCatalogCard, ProductSize, useProductsSizesControllerGetByCategotyIdWithPaginationQuery, useProductsSizesControllerGetPaginationQuery, useProductsSizesControllerGetProductsCatalogWithPaginationQuery } from "../../store/product";
import { SmartProductCard } from "../product/SmartProductCart";
import { useSizeContollerGetByNameQuery } from "../../store/size";
import CenteredSpin from "../../shared/ui/spinner/CenteredSpin";
import { SmartProductCardCatalog } from "../product/SmartProductCardCatalog";

const Wrapper = styled.div`
    padding: 24px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    /* margin-left: 50px; */
`;

export const BlockGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(286px, 1fr));
    gap: 18px; 
`

const BlockProducts: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    // const { isLoading, data } = useProductsSizesControllerGetByCategotyIdWithPaginationQuery({ page: page, limit: pageSize });
    const { data: newData, isLoading: isNewDataLoading } = useProductsSizesControllerGetProductsCatalogWithPaginationQuery({ limit: pageSize, page: page, sort: 'averageRating_asc' });

    const [productsSizes, setProductSizes] = useState<ProductCatalogCard[]>([]);

    useEffect(() => {
        if (!isNewDataLoading && newData?.products) {
            setProductSizes(prev => [...prev, ...newData.products]);
        }
    }, [newData, isNewDataLoading]);

    const clickHandler = () => {
        const allPages = Math.ceil((newData?.count ?? 0) / pageSize);
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
                        isNewDataLoading
                            ? <CenteredSpin />
                            : newData && productsSizes.map((item, index) =>
                                <SmartProductCardCatalog key={`productSizes-${index}`} product={item} />
                            )
                    }
                </BlockGrid>

                {
                    (newData?.count ?? -1) > productsSizes.length
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