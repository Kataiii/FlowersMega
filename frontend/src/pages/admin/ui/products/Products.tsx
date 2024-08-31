import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useProductsControllerGetAllQuery } from "../../../../store/product";
import { useMemo } from "react";
import Product from "../../../product/ui/Product";

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

    return (
        <div>
            <Button onClick={() => {
                navigate(`/admin/product/${null}`, { state: { previousLocation: locate.pathname } })
            }}>
                Добавить продукт
            </Button>
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

        </div>

    )
}

export default Products;