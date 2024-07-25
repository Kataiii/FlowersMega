import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import ListStructureProduct from "../../entities/product/ui/listStructureProduct/ListStrucureProduct";
import { PRODUCT_PATH } from "../../shared/utils/constants";
import { Product, ProductSize, useProductsSizesControllerGetAllSizesByProductIdQuery } from "../../store/product"

type DescriptionProductProps = {
    product: Product & { productSize: ProductSize };
}

const Button = styled.button<{ $primary?: boolean; }>`
    cursor: pointer;
    height: 28px; 
    flex-grow: 1;
    border: 1px solid var(--primary-bg-color);
    background-color: ${props => props.$primary ? "var(--primary-bg-color)" :  "var(--block-bg-color)"};
    border-radius: 6px;
    padding: 0 16px;
    font-family: "Inter";
    font-weight: 400;
    font-size: 14px;
    color: ${props => props.$primary ? "var(--primary-text-color)" : "var(--primary-bg-color)"};
`;

const DescriptionProduct: React.FC<DescriptionProductProps> = ({ product }) => {
    const { isLoading, data } = useProductsSizesControllerGetAllSizesByProductIdQuery({ id: product.id });
    const navigate = useNavigate();

    return (
        <>
            {
                isLoading
                    ? <p>Загрузка...</p>
                    : <div style={{ height: "fit-content", width: "50%", backgroundColor: "var(--block-bg-color)", padding: "24px 16px 50px", borderRadius: 6, display: "flex", flexDirection: "column", gap: 24 }}>
                        <div style={{ display: "flex", gap: 16 }}>
                            {
                                data && data?.sizes.map((item, index) => {
                                    return <Button 
                                                key={index} 
                                                $primary={product.productSize.idSize === item.id}
                                                onClick={() => navigate(`${PRODUCT_PATH}/${product.name}/${item.name}`, {state: {idProduct: product.id, idSize: item.id}})}
                                            >{item.name}</Button>
                                })
                            }
                        </div>
                        <p style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 24, color: "var(--secondary-text-color)" }}>{product.productSize.prise.toLocaleString()} ₽</p>
                        <p style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 16, color: "var(--secondary-text-color)" }}>Размер букета {product.productSize.paramsSize}</p>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button style={{ width: "49%", cursor: "pointer", minWidth: 380, height: 55, backgroundColor: "var(--primary-bg-color)", border: "1px solid #FF749F", borderRadius: 6, fontFamily: "Inter", fontWeight: 400, fontSize: 20, color: "var(--primary-text-color)" }}>Заказать</button>
                            <button style={{ width: "49%", cursor: "pointer", minWidth: 380, height: 55, backgroundColor: "var(--block-bg-color)", border: "1px solid #FF749F", borderRadius: 6, fontFamily: "Inter", fontWeight: 400, fontSize: 20, color: "var(--primary-bg-color)" }}>Купить в 1 клик</button>
                        </div>

                        <ListStructureProduct structure={product.structure} />
                        <p style={{ fontFamily: "Inter", fontWeight: 300, fontSize: 16, color: "var(--secondary-text-color)" }}>{product.description}</p>
                    </div>
            }
        </>

    )
}

export default DescriptionProduct;