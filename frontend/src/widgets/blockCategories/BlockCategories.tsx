import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import CardCategory from "../../entities/category/ui/cardCategory/CardCategory";
import SecondaryButton from "../../shared/ui/button/SecondaryButton";
import Container from "../../shared/ui/containerMain/ContainerMain";
import TitleSection from "../../shared/ui/titleSection/TitleSection";
import { CATALOG_PATH, CATEGORY_PATH } from "../../shared/utils/constants";
import { Category, useCategoriesControllerGetPaginationQuery } from "../../store/category";
import CenteredSpin from "../../shared/ui/spinner/CenteredSpin";

const ContainerCategories = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); /* Карточки занимают не менее 200px */
    gap: 15px;
`;


const Wrapper = styled.div`
    background-color: var(--block-bg-color);
    padding: 24px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
`;

const GradientDiv = styled.div`
    background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 48.5%, #FFFFFF 100%);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
`

const BlockCategories: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(8);
    const { isLoading, data } = useCategoriesControllerGetPaginationQuery({ page: page, limit: pageSize });
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);

    const clickHandler = () => {
        const allPages = Math.floor((data?.count ?? -1) / 8);
        if (pageSize <= (data ? data?.count : 1)) {
            setPageSize(pageSize => pageSize + 3);
            if (!isLoading) {
                setCategories([...categories, ...data?.categories ?? []]);
            }
        }
    }

    useEffect(() => {
        if (!isLoading) {
            setCategories([...categories, ...data?.categories ?? []]);
            setPage(page => page + 1);
        }
    }, [isLoading]);

    return (
        <Container>
            <TitleSection content="Популярные категории" />
            <>
                {
                    isLoading
                        ? <CenteredSpin />
                        :
                        <Wrapper>
                            <ContainerCategories>
                                {
                                    data && categories.map((item, index) => {
                                        return <CardCategory key={`categories-${index}`} category={item} clickHandler={() => navigate({
                                            pathname: `${CATALOG_PATH}${CATEGORY_PATH}`,
                                            search: createSearchParams({
                                                category: item.name
                                            }).toString()
                                        })} />
                                    })
                                }
                            </ContainerCategories>
                            {
                                (data?.count ?? -1) > categories.length
                                    ? <div style={{ width: "10%", margin: "0 auto" }}>
                                        {/* <GradientDiv/> */}
                                        <SecondaryButton buttonContent={"Загрузить еще"} clickHandler={clickHandler} />
                                    </div>
                                    : null
                            }
                        </Wrapper>
                }
            </>
        </Container>
    )
}

export default BlockCategories;