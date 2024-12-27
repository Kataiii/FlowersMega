import React, { useMemo, useState, useCallback } from "react";
import { Button, Input, Pagination, Select, Space, Spin } from "antd";
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
import { Debouncer } from "../../../../shared/utils/debounce";
import { useSizesControllerGetAllQuery } from "../../../../store/size";
import CenteredSpin from "../../../../shared/ui/spinner/CenteredSpin";



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
    const [sortOrder, setSortOrder] = useState<string>("updatedAt DESC");
    const [searchId, setSearchId] = useState<string>("");
    const [finalSearchId, setFinalSearchId] = useState<string>("");
    const [categories, setCategories] = useState<number[]>([]);
    const [filters, setFilters] = useState<number[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(8);
    const { data: filtersData, isLoading: isFiltersLoading } = useFiltersControllerGetAllQuery();
    const { data: categoriesData, isLoading: isCategoriesLoading } = useCategoriesControllerGetAllQuery();
    const { data: productType } = useTypesProductControllerGetAllQuery();
    const { data: sizes, isLoading: isSizesLoading } = useSizesControllerGetAllQuery();
    const { data: productSizedPag, isLoading: isProductsPaginationLoading } = useProductSizesControllerGetProductsWithPaginationQuery(
        {
            page: page, limit: pageSize,
            search: finalSearchId,
            field: sortOrder.split(' ')[0],
            type: sortOrder.split(' ')[1],
            categories: categories,
            filters: filters,
        }
    );
    console.log(productSizedPag, "PIPYAOOOOOOO");
    const debouncer = new Debouncer();

    const debouncedSearch = useCallback(
        debouncer.debounce((searchValue: string) => {
            setFinalSearchId(searchValue);
            setPage(1);
        }, 2000), []
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchValue = e.target.value;
        setSearchId(newSearchValue);
        debouncedSearch(newSearchValue);
    };

    const handleCategoriesChange = useCallback((categories: any[]) => {
        const selectedCategoryIds = categories.map(category => category.id);
        setCategories(selectedCategoryIds);

    }, []);

    const handleFiltersChange = useCallback((filters: any[]) => {
        const selectedFilters = filters.map(filter => filter.id);
        setFilters(selectedFilters);
    }, []);

    // const productData = useMemo(() => {
    //     if (!productSizedPag) return [];
    //     return productSizedPag.products.map((product) => ({
    //         ...product
    //     }));
    // }, [productSizedPag]);

    // const sortedData = useMemo(() => {
    //     const sorted = [...productData];
    //     return sorted;
    // }, [productData, sortOrder]);

    const handlePageChange = (newPage: number, newPageSize?: number) => {
        if (page !== newPage) setPage(newPage);
        if (newPageSize && newPageSize !== pageSize) {
            setPageSize(newPageSize);
        }
    };

    const handleSortChange = (value: string) => {
        setSortOrder(value);
        setPage(1);
    };

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
                    onClick={() => navigate(`/admin/product/create`, { state: { previousLocation: locate.pathname } })}
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
                            onChange={handleSearchChange}
                        />
                        <Button style={{ width: "150px" }} type="primary" > <ButtonText style={{ display: "inline" }}>Найти</ButtonText> <SearchOutlined /> </Button>
                    </Space.Compact>
                    <div style={{ display: "flex", flexDirection: "column", padding: "8px 8px 8px 0", gap: "8px" }}>
                        {isFiltersLoading && isCategoriesLoading ? <Spin size="default" /> :
                            <>
                                {isCategoriesLoading ? (
                                    <Spin />
                                ) : (
                                    <CategoryDropdown
                                        name="Категории"
                                        data={categoriesData?.map(item => {
                                            return { id: item.id, name: item.name };
                                        })}
                                        showAddButton={true}
                                        onChange={handleCategoriesChange}
                                    />
                                )}

                                <CategoryDropdown name="Теги" data={filtersData?.flatMap(filter => filter.items).map(item => {
                                    return { id: item.id, name: item.name }
                                })} onChange={handleFiltersChange} />
                            </>

                        }
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <div style={{ color: "var(--secondary-bg-color)", marginRight: "10px", paddingTop: "5px" }}>
                        <SortText>
                            Сортировать по
                        </SortText>
                    </div>
                    <Select
                        defaultActiveFirstOption={true}
                        defaultValue="updatedAt DESC"
                        style={{ width: 150, height: 25 }}
                        options={[
                            { value: "updatedAt ASC", label: "Дата (старые)" },
                            { value: "updatedAt DESC", label: "Дата (новые)" },
                            { value: "id ASC", label: "По ID (по возрастанию)" },
                            { value: "id DESC", label: "По ID (по убыванию)" },
                        ]}
                        placeholder="Выбрать"
                        value={sortOrder}
                        onChange={handleSortChange}
                    />
                </div>
                <>
                    {
                        isProductsPaginationLoading || isSizesLoading
                            ? <CenteredSpin />
                            : <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                                {productSizedPag?.products.map((product) => ({
                                    ...product
                                })).map((product, index) => (
                                    <ProductAdminCard
                                        key={product.products.id}
                                        product={product}
                                        sizes={sizes}
                                        type={productType?.find((type) => product.products.idTypeProduct === type.id)?.name}
                                    />
                                ))}
                            </div>
                    }
                </>
                {/* @ts-ignore */}
                <Pagination showLessItems={true} current={page} pageSize={pageSize} total={productSizedPag?.count || 0} onChange={handlePageChange} style={{ marginTop: "16px", textAlign: "center" }} />
            </OrderContainer>
        </Container>
    );
};

export default Products;
