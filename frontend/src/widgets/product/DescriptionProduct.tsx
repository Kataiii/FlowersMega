import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { isInCartSelector } from "../../entities/cart/redux/selectors";
import { addOneToCart } from "../../entities/cart/redux/slice";
import ListStructureProduct from "../../entities/product/ui/listStructureProduct/ListStrucureProduct";
import ProductPageCountController from "../../features/product-page-count-controller/ProductPageCountController";
import { PRODUCT_PATH, API_URL } from "../../shared/utils/constants";
import { Product, ProductSize, useCategoryControllerGetIdByNameQuery, useProductsSizesControllerGetAllSizesByProductIdQuery } from "../../store/product"
import { useAppDispatch, useAppSelector } from "../../store/store";
import ts from "typescript";
import { ignore } from "antd/es/theme/useToken";
import PostcardAddBlock from "../postcard/PostcardAddBlock";
import { Modal, Skeleton } from "antd";
import ModalRoute from "../../shared/ui/modalRoute/ModalRoute";
import ModalEmpty from "../../shared/ui/modalEmpty/ModalEmpty";
import { SetStateAction, useState } from "react";
import Additions from "./Additions";
import DecorsAddition from "./DecorsAddition";
import CardCategory from "../../entities/category/ui/cardCategory/CardCategory";
import { useCategoriesControllerGetByIdQuery } from "../../store/category";
import { Title } from "../../shared/ui/forAdditionalPages/Title";
import { Text } from "../../shared/ui/forAdditionalPages/Content";
import FastFormOrder from "../fastFormOrder/FastFormOrder";
import CenteredSpin from "../../shared/ui/spinner/CenteredSpin";
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
    const { data: categoryIdData, isLoading: isCategoryDataLoading } = useCategoryControllerGetIdByNameQuery({ name: "Открытки" });
    const location = useLocation();
    const { data: categoryIdDatA } = useCategoryControllerGetIdByNameQuery({ name: "Мягкие игрушки" });
    const { data: categoryIdDataB } = useCategoryControllerGetIdByNameQuery({ name: "Шары" });
    const { data: categoryIdDataC } = useCategoryControllerGetIdByNameQuery({ name: "Топперы" });
    const { data: categoryIdDataD } = useCategoryControllerGetIdByNameQuery({ name: "Комнатные цветы" });
    const { data: categoryIdDataE } = useCategoryControllerGetIdByNameQuery({ name: "Клубника в шоколаде" });

    const { data: ToppersAddition } = useCategoriesControllerGetByIdQuery({ id: Number(categoryIdDataC) });
    const { data: DecorsAdditionCat } = useCategoriesControllerGetByIdQuery({ id: Number(categoryIdDatA) });
    const { data: PostcardAddition } = useCategoriesControllerGetByIdQuery({ id: Number(categoryIdData) });
    const [isOpen, setIsOpen] = useState(false);
    console.log(location)
    // @ts-ignore
    console.log(`${API_URL}/products/images/${product?.productSize.idProduct}/${product?.images[0].url}`)
    return (
        <>

            {isLoading ? (
                <Skeleton active />
            ) : (
                // @ts-ignore
                product.categories[0].id === Number(categoryIdData) ? (
                    <div style={{ height: "98%", width: "50%", backgroundColor: "var(--block-bg-color)", padding: "24px 16px 50px", borderRadius: 6, display: "flex", flexDirection: "column", gap: 24 }}>
                        <span style={{ fontFamily: "Inter", fontWeight: "bold", fontSize: "32px" }}>{product.productSize.extraPrice} ₽</span>
                        <PostcardAddBlock style={{ maxHeight: "615px" }} showHeader={true} product={{ ...product.productSize, product: product }} />

                        <div style={{ display: "inline-flex" }}>
                            <p style={{ fontFamily: "Inter", fontWeight: "400", fontSize: "16px" }}><span style={{ color: "var(--primary-bg-color)", fontWeight: "600" }}>Примечание:</span> все добавленные на этой странице открытки будут отправлены в вашу корзину (изменить текст добавленных открыток можно будет также на странице корзины)</p><span style={{ fontFamily: "Inter" }}></span>
                        </div>
                    </div>

                ) : (
                    <>

                        <div style={{ height: "fit-content", width: "50%", backgroundColor: "var(--block-bg-color)", padding: "24px 16px 50px", borderRadius: 6, display: "flex", flexDirection: "column", gap: 24, }}>
                            <div style={{ display: "flex", gap: 16 }}>
                                {/* @ts-ignore */}
                                {(data?.sizes.length > 1) ? data?.sizes.map((item, index) => (
                                    <Button
                                        key={index}
                                        $primary={product.productSize.idSize === item.id}
                                        onClick={() => navigate(`${PRODUCT_PATH}/${product.name}/${item.name}`, { state: { idProduct: product.id, idSize: item.id } })}
                                    >
                                        {item.name}
                                    </Button>
                                )) : (null)}
                            </div>
                            <p style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 24, color: "var(--secondary-text-color)" }}>
                                {product.productSize.extraPrice.toLocaleString()} ₽
                            </p>
                            {
                                // @ts-ignore
                                product.productSize.paramsSize === '' ||
                                    // @ts-ignore
                                    product.productSize.paramsSize === ' ' ||
                                    // @ts-ignore
                                    product.productSize.paramsSize === undefined ||
                                    // @ts-ignore
                                    product.productSize.paramsSize === null ||
                                    // @ts-ignore
                                    product.productSize.paramsSize === '-' ? (
                                    <></>
                                ) : (
                                    <p style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 16, color: "var(--secondary-text-color)" }}>
                                        Размер букета {product.productSize.paramsSize}
                                    </p>
                                )}


                            <div style={{ display: "grid", gridTemplateColumns: "49% 49%", gap: "1%", alignItems: "center", justifyContent: "space-around" }}>
                                {isInCart ? (
                                    <ProductPageCountController id={product.productSize.id ?? -1} />
                                ) : (
                                    <button onClick={() => dispatch(addOneToCart({ ...product.productSize, product }))} style={{ width: "100%", cursor: "pointer", minWidth: "95%", height: 55, backgroundColor: "var(--primary-bg-color)", border: "1px solid #FF749F", borderRadius: 6, fontFamily: "Inter", fontWeight: 400, fontSize: 20, color: "var(--primary-text-color)" }}>
                                        Заказать
                                    </button>
                                )}
                                {/* {
                                    // @ts-ignore
                                    product.categories[0].id === Number(categoryIdDataC) ||
                                        // @ts-ignore
                                        product.categories[0].id === Number(categoryIdDatA) ||
                                        // @ts-ignore
                                        product.categories[0].id === Number(categoryIdDataB) ? (
                                        null
                                    ) : ( */}
                                <button onClick={() => setIsOpen(true)} style={{ width: "100%", cursor: "pointer", minWidth: "95%", height: 55, backgroundColor: "var(--block-bg-color)", border: "1px solid #FF749F", borderRadius: 6, fontFamily: "Inter", fontWeight: 400, fontSize: 20, color: "var(--primary-bg-color)" }}>
                                    Купить в 1 клик
                                </button>
                                {/* )} */}

                            </div>

                            <ListStructureProduct structure={product.structure} />
                            <p style={{ fontFamily: "Inter", fontWeight: 300, fontSize: 16, color: "var(--secondary-text-color)" }}>
                                {product.description}
                            </p>


                        </div>


                        {/* <ToppersAddition isToppersOpen={isToppersOpen} setIsToppersOpen={setIsToppersOpen} />
                        <PostcardAddition isPostcardsOpen={isPostcardsOpen} setIsPostcardsOpen={setIsPostcardsOpen} /> */}

                    </>
                )
            )}

            <ModalEmpty isOpen={isOpen} setIsOpen={() => setIsOpen(false)} >
                <>
                    <Title style={{ fontSize: 24, margin: 0 }}>Быстрый заказ</Title>
                    <Text style={{ fontWeight: 400, fontSize: 14, color: "var(--text-modal)", margin: 0 }}>для позиции</Text>
                    <div style={{ margin: "15px 0 0", display: 'flex', gap: 24, alignItems: "center", border: "1px solid var(--primary-bg-color)", width: "100%", borderRadius: 4, padding: 8 }}>
                        {/* @ts-ignore */}
                        {/* <Image width={30} height={30} style={{ borderRadius: 4 }} src={`${API_URL}/products/images/${product?.productSize.idProduct}/${product?.images[0].url}`} /> */}
                        <Title style={{ fontWeight: 700, fontSize: 16, color: "var(--primary-bg-color)" }}>{product.name} </Title>
                    </div>
                    {/* {`(${product.productSize.size.name})`} */}
                    <FastFormOrder item={{ ...product.productSize, count: 1, product: { ...product, id: product.productSize.idProduct, structure: "" } }} />
                </>
            </ModalEmpty>
        </>
    );
};

export default DescriptionProduct;
