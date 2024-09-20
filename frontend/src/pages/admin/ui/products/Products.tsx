import React, { useMemo, useState, useCallback } from "react";
import { Button, Input, Pagination, Select, Space } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useProductsControllerGetAllQuery, useProductSizesControllerGetProductsWithPaginationQuery, useProductsSizesControllerGetByCategotyIdWithPaginationQuery } from "../../../../store/product";
import Container from "../../../../shared/ui/containerMain/ContainerMain";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import OrderContainer from "../../../../shared/ui/orderContainer/OrderContainer";
import CategoryDropdown from "../../../../shared/ui/dropdown/CategoryDropdown";
import { useFiltersControllerGetAllQuery } from "../../../../store/filter";
import { useCategoriesControllerGetAllQuery } from "../../../../store/category";
import ProductAdminCard from "../../../../widgets/ProductAdminCard/ProductAdminCard";
import { useTypesProductControllerGetAllQuery } from "../../../../store/typeProduct";
import { styled } from "styled-components";
import { SortText } from "../orders/Orders";
import ExtraPriceBlock from "../../../../widgets/extraPrice/ExtraPriceBlock";
import PostcardAddBlock from "../../../../widgets/postcard/PostcardAddBlock";



export const NamePage = styled.p`
    font-family: "Inter UI", sans-serif;
    font-weight: 700;
    font-size: 32px;
`

export const NameContainer = styled.p`
    font-family: "Inter UI", sans-serif;
    font-weight: 600;
    font-size: 20px;
`

export const ButtonText = styled.p`
    font-family: "Inter UI", sans-serif;
    font-weight: 700;
    font-size: 14;
    
`


const Products: React.FC = () => {
    const navigate = useNavigate();
    const locate = useLocation();
    // const { isLoading, data: products } = useProductsControllerGetAllQuery();
    const [sortOrder, setSortOrder] = useState<string>("");
    const [searchId, setSearchId] = useState<string>("");
    const [categories, setCategories] = useState<string[]>([]);
    const [filters, setFilters] = useState<string[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(2);
    const { data: filtersData } = useFiltersControllerGetAllQuery();
    const { data: categoriesData } = useCategoriesControllerGetAllQuery();
    const { data: productType } = useTypesProductControllerGetAllQuery();
    const { data: productSizedPag } = useProductSizesControllerGetProductsWithPaginationQuery({ page: page, limit: pageSize });

    const handleCategoriesAndFiltersChange = useCallback((categories: string[], filters: string[]) => {
        setCategories(categories);
        setFilters(filters);
    }, []);

    const productData = useMemo(() => {
        if (!productSizedPag) return [];
        return productSizedPag.products.map((product) => ({
            ...product
        }));
    }, [productSizedPag]);

    const filteredData = useMemo(() => {
        if (!searchId) return productData;
        return productData.filter(product => product.products.name.toString().includes(searchId));
    }, [searchId, productData]);

    const sortedData = useMemo(() => {
        const sorted = [...filteredData];
        switch (sortOrder) {
            case "DateASC":
                // @ts-ignore
                return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            case "DateDESC":
                // @ts-ignore
                return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            default:
                return sorted;
        }
    }, [filteredData, sortOrder]);

    const handlePageChange = (newPage: number, newPageSize?: number) => {
        setPage(newPage);
        if (newPageSize) {
            setPageSize(newPageSize);
        }
    };

    // if (isLoading) return <div>Loading...</div>;

    return (
        <Container style={{ backgroundColor: "var(--main-bg-color)" }}>
            <div style={{ display: "flex", margin: "16px 0 0 16px" }}>
                <NamePage>
                    Товары
                </NamePage>
            </div>
            <OrderContainer>
                <div style={{ display: "flex", margin: "8px" }}>
                    <NameContainer>
                        База товаров
                    </NameContainer>
                </div>
                <ExtraPriceBlock />
                <Button
                    shape="round"
                    type="primary"
                    onClick={() => navigate(`/admin/product/${null}`, { state: { previousLocation: locate.pathname } })}
                >
                    <ButtonText>
                        Добавить товар <PlusCircleOutlined />
                    </ButtonText>

                </Button>
                <div style={{ border: "1px solid var(--primary-bg-color)", borderRadius: "10px", padding: "5px" }}>
                    <Space.Compact size="large" block>
                        <Input
                            placeholder="Поиск"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                        <Button style={{ width: "150px" }} type="primary" > <ButtonText style={{ display: "inline" }}>Найти</ButtonText> <SearchOutlined /> </Button>
                    </Space.Compact>
                    <div style={{ display: "flex", flexDirection: "column", padding: "8px 8px 8px 0", gap: "8px" }}>
                        <CategoryDropdown name="Категории" data={categoriesData} showAddButton={true} />
                        <CategoryDropdown name="Теги" data={filtersData?.flatMap(filter => filter.items)} />
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <div style={{ color: "var(--secondary-bg-color)", marginRight: "10px", paddingTop: "5px" }}>
                        <SortText>
                            Сортировать по
                        </SortText>
                    </div>
                    <Select
                        allowClear
                        style={{ width: 150, height: 25 }}
                        options={[
                            { value: "DateASC", label: "Дата (новые)" },
                            { value: "DateDESC", label: "Дата (старые)" },
                        ]}
                        placeholder="Выбрать"
                        value={sortOrder}
                        onChange={(value) => setSortOrder(value)}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "8px", flexWrap: "wrap" }}>
                    {sortedData.map((product, index) => (
                        <ProductAdminCard
                            key={product.products.id}
                            id={product.products.id}
                            name={product.products.name}
                            type={productType?.find((type) => product.products.idTypeProduct === type.id)?.name}
                        />
                    ))}
                </div>
                {/* @ts-ignore */}
                <Pagination current={page} pageSize={pageSize} total={productSizedPag?.count || 0} onChange={handlePageChange} style={{ marginTop: "16px", textAlign: "center" }} />
                <>
                    {console.log('Total count:', productSizedPag)}
                </>
            </OrderContainer>
        </Container>
    );
};

export default Products;
