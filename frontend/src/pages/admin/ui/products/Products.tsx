import React, { useMemo, useState, useCallback } from "react";
import { Button, Input, Select, Space } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useProductsControllerGetAllQuery } from "../../../../store/product";
import Container from "../../../../shared/ui/containerMain/ContainerMain";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import OrderContainer from "../../../../shared/ui/orderContainer/OrderContainer";
import CategoryDropdown from "../../../../shared/ui/dropdown/CategoryDropdown";
import { useFiltersControllerGetAllQuery } from "../../../../store/filter";
import { useCategoriesControllerGetAllQuery } from "../../../../store/category";
import ProductAdminCard from "../../../../widgets/ProductAdminCard/ProductAdminCard";

const Products: React.FC = () => {
    const navigate = useNavigate();
    const locate = useLocation();
    const { isLoading, data: products } = useProductsControllerGetAllQuery();
    const [sortOrder, setSortOrder] = useState<string>("");
    const [searchId, setSearchId] = useState<string>("");
    const [categories, setCategories] = useState<string[]>([]);
    const [filters, setFilters] = useState<string[]>([]);
    const { data: filtersData } = useFiltersControllerGetAllQuery();
    const { data: categoriesData } = useCategoriesControllerGetAllQuery();

    const handleCategoriesAndFiltersChange = useCallback((categories: string[], filters: string[]) => {
        setCategories(categories);
        setFilters(filters);
    }, []);

    const productData = useMemo(() => {
        if (!products) return [];
        return products.map((product) => ({
            ...product
        }));
    }, [products]);

    const filteredData = useMemo(() => {
        if (!searchId) return productData;
        return productData.filter(product => product.name.toString().includes(searchId));
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

    if (isLoading) return <div>Loading...</div>;

    return (
        <Container style={{ backgroundColor: "var(--main-bg-color)" }}>
            <h1 style={{ display: "flex", margin: "16px 0 0 16px" }}>Товары</h1>
            <OrderContainer>
                <h2 style={{ display: "flex", margin: "8px" }}>База заказов</h2>
                <Button
                    shape="round"
                    type="primary"
                    onClick={() => navigate(`/admin/product/${null}`, { state: { previousLocation: locate.pathname } })}
                >
                    Добавить товар <PlusCircleOutlined />
                </Button>
                <div style={{ border: "1px solid var(--primary-bg-color)", borderRadius: "10px", padding: "5px" }}>
                    <Space.Compact size="large" block>
                        <Input
                            placeholder="Поиск"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                        <Button type="primary" icon={<SearchOutlined />}>Найти</Button>
                    </Space.Compact>
                    <div style={{ display: "flex", flexDirection: "column", padding: "8px 8px 8px 0", gap: "8px" }}>
                        <CategoryDropdown name="Категории" data={categoriesData} showAddButton={true} />
                        <CategoryDropdown name="Теги" data={filtersData?.flatMap(filter => filter.items)} />
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <p style={{ color: "var(--secondary-bg-color)", marginRight: "10px" }}>Сортировать по</p>
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
                    {sortedData.map((product) => (
                        <ProductAdminCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            type={product.idTypeProduct}
                            onCategoriesAndFiltersChange={handleCategoriesAndFiltersChange}
                        />
                    ))}
                </div>
            </OrderContainer>
        </Container>
    );
};

export default Products;
