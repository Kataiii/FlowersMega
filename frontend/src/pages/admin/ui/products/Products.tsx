import { Button, Input, Space } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useProductsControllerGetAllQuery } from "../../../../store/product";
import { useMemo, useState } from "react";
import Product from "../../../product/ui/Product";
import Container from "../../../../shared/ui/containerMain/ContainerMain";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import OrderContainer from "../../../../shared/ui/orderContainer/OrderContainer";
import CategoryDropdown from "../../../../shared/ui/dropdown/CategoryDropdown";
import TagMenu from "../../../../shared/ui/dropdown/TagMenu";

const Products: React.FC = () => {
    const navigate = useNavigate();
    const { isLoading, data } = useProductsControllerGetAllQuery();
    const locate = useLocation();

    const productData = useMemo(() => {
        if (!data) return [];
        return data.map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            structure: product.structure,
            idTypeProduct: product.idTypeProduct
        }))
    }, [data]);

    const [searchId, setSearchId] = useState<string>("");


    return (

        <Container
            style={{
                backgroundColor: "var(--main-bg-color)",
            }}
        >
            <h1
                style={{
                    display: "flex",
                    margin: "16px 0 0 16px",
                }}
            >
                Товары
            </h1>
            <OrderContainer>
                <h2 style={{ display: "flex", margin: "8px" }}>База заказов</h2>
                <Button shape="round" type="primary" onClick={() => {
                    navigate(`/admin/product/${null}`, { state: { previousLocation: locate.pathname } })
                }}>
                    Добавить товар <PlusCircleOutlined />
                </Button>
                <div
                    style={{
                        border: "1px solid var(--primary-bg-color)",
                        borderRadius: "10px",
                        padding: "5px",
                    }}
                >
                    <Space.Compact size="large" block>
                        <Input
                            placeholder="Поиск по ID"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                        <Button type="primary" icon={<SearchOutlined />}>Найти</Button>
                    </Space.Compact>
                    <div style={
                        {
                            padding: "8px 8px 8px 0",
                        }
                    }>
                        <CategoryDropdown />
                    </div>
                </div>

                {
                    productData?.map((product) => {
                        return (<div>
                            <Button
                                type="primary"
                                style={
                                    {
                                        backgroundColor: "var(--primary-bg-color)",
                                    }
                                }
                                onClick={() => {
                                    navigate(`/admin/product/${product.id}`, { state: { previousLocation: locate.pathname } });
                                    { console.log(product?.id) }
                                }}
                            >
                                Редактировать
                            </Button >
                        </div>);


                    })

                }
            </OrderContainer>

        </Container>




    )
}

export default Products;