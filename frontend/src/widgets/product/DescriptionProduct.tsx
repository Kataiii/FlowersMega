import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { isInCartSelector } from "../../entities/cart/redux/selectors";
import { addOneToCart } from "../../entities/cart/redux/slice";
import ListStructureProduct from "../../entities/product/ui/listStructureProduct/ListStrucureProduct";
import ProductPageCountController from "../../features/product-page-count-controller/ProductPageCountController";
import { PRODUCT_PATH } from "../../shared/utils/constants";
import { Product, ProductSize, useCategoryControllerGetIdByNameQuery, useProductsSizesControllerGetAllSizesByProductIdQuery } from "../../store/product"
import { useAppDispatch, useAppSelector } from "../../store/store";
import ts from "typescript";
import { ignore } from "antd/es/theme/useToken";
import PostcardAddBlock from "../postcard/PostcardAddBlock";

type DescriptionProductProps = {
    product: Product & { productSize: ProductSize };
}

const Button = styled.button<{ $primary?: boolean; }>`
    cursor: pointer;
    height: 28px; 
    flex-grow: 1;
    border: 1px solid var(--primary-bg-color);
    background-color: ${props => props.$primary ? "var(--primary-bg-color)" : "var(--block-bg-color)"};
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
    const dispatch = useAppDispatch();
    const isInCart = useAppSelector(state => isInCartSelector(state, product.productSize));
    const { data: categoryIdData } = useCategoryControllerGetIdByNameQuery({ name: "Открытки" });
    // @ts-ignore
    console.log(product.categories[0].id)
    // @ts-ignore
    console.log(product.categories[0].id === Number(categoryIdData), "66666666666666666666666666")
    return (
        <>
            {isLoading ? (
                <p>Загрузка...</p>
            ) : (
                // @ts-ignore
                product.categories[0].id === Number(categoryIdData) ? (
                    <div style={{ height: "98%", width: "50%", backgroundColor: "var(--block-bg-color)", padding: "24px 16px 50px", borderRadius: 6, display: "flex", flexDirection: "column", gap: 24 }}>
                        <span style={{ fontFamily: "Inter", fontWeight: "bold", fontSize: "32px" }}>{product.productSize.prise} ₽</span>
                        <PostcardAddBlock />
                        <div style={{ display: "inline-flex" }}>
                            <p style={{ fontFamily: "Inter", fontWeight: "400", fontSize: "16px" }}><span style={{ color: "var(--primary-bg-color)", fontWeight: "600" }}>Примечание:</span> все добавленные на этой странице открытки будут отправлены в вашу корзину (изменить текст добавленных открыток можно будет также на странице корзины)</p><span style={{ fontFamily: "Inter" }}></span>
                        </div>
                    </div>

                ) : (
                    <div style={{ height: "fit-content", width: "50%", backgroundColor: "var(--block-bg-color)", padding: "24px 16px 50px", borderRadius: 6, display: "flex", flexDirection: "column", gap: 24 }}>
                        <div style={{ display: "flex", gap: 16 }}>
                            {data && data?.sizes.map((item, index) => (
                                <Button
                                    key={index}
                                    $primary={product.productSize.idSize === item.id}
                                    onClick={() => navigate(`${PRODUCT_PATH}/${product.name}/${item.name}`, { state: { idProduct: product.id, idSize: item.id } })}
                                >
                                    {item.name}
                                </Button>
                            ))}
                        </div>
                        <p style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 24, color: "var(--secondary-text-color)" }}>
                            {product.productSize.prise.toLocaleString()} ₽
                        </p>
                        <p style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 16, color: "var(--secondary-text-color)" }}>
                            Размер букета {product.productSize.paramsSize}
                        </p>

                        <div style={{ display: "flex", gap: 10 }}>
                            {isInCart ? (
                                <ProductPageCountController id={product.productSize.id ?? -1} />
                            ) : (
                                <button onClick={() => dispatch(addOneToCart({ ...product.productSize, product }))} style={{ width: "49%", cursor: "pointer", minWidth: 380, height: 55, backgroundColor: "var(--primary-bg-color)", border: "1px solid #FF749F", borderRadius: 6, fontFamily: "Inter", fontWeight: 400, fontSize: 20, color: "var(--primary-text-color)" }}>
                                    Заказать
                                </button>
                            )}
                            <button style={{ width: "49%", cursor: "pointer", minWidth: 380, height: 55, backgroundColor: "var(--block-bg-color)", border: "1px solid #FF749F", borderRadius: 6, fontFamily: "Inter", fontWeight: 400, fontSize: 20, color: "var(--primary-bg-color)" }}>
                                Купить в 1 клик
                            </button>
                        </div>

                        <ListStructureProduct structure={product.structure} />
                        <p style={{ fontFamily: "Inter", fontWeight: 300, fontSize: 16, color: "var(--secondary-text-color)" }}>
                            {product.description}
                        </p>
                    </div>
                )
            )}
        </>
    );
};

export default DescriptionProduct;
