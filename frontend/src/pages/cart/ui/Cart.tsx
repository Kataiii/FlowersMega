import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { cartSelectors, selectTotalCount } from "../../../entities/cart/redux/selectors";
import Button from "../../../shared/ui/button/Button";
import Container from "../../../shared/ui/containerMain/ContainerMain";
import { CATALOG_PATH } from "../../../shared/utils/constants";
import { useAppSelector } from "../../../store/store";
import { CartProductCard } from "../../../widgets/cart-product-card/CartProductCard";

const Cart: React.FC = () => {
    const navigate = useNavigate();
    const cartTotal = useAppSelector(selectTotalCount);
    const productsInCart = useAppSelector(cartSelectors.selectAll);

    const totalCost = useMemo(
        () => productsInCart.map(p => p.count * (p.prise ?? 0)).reduce((prev, curr) => prev + curr, 0),
        [productsInCart]
    )

    return (
        <Container style={{ margin: "0 auto", flexGrow: 3, padding: "35px 0" }}>
            <h1 style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 32, color: "var(--secondary-text-color)" }}>{`Моя корзина (${cartTotal})`}</h1>
            <div style={{ padding: '0 10px' }}>
                <div style={{
                    borderRadius: "6px",
                    padding: '16px 16px 32px 16px',
                    backgroundColor: '#FFFFFF'
                }}>
                    {
                        productsInCart.length === 0
                            ?   <div style={{width: "100%", height: "100%", padding: 45, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 25}}>
                                    <h2 style={{fontFamily: "Inter", fontSize: 16, fontWeight: 400, color: "var(--secondary-text-color)"}}>Корзина пуста</h2>
                                    <p style={{fontFamily: "Inter", fontSize: 14, fontWeight: 400, color: "var(--secondary-text-color)"}}>Для выбора товаров перейдите в каталог</p>
                                    <div style={{width: "fit-content"}}>
                                        <Button buttonContent={"Перейти в каталог"} clickHandler={() => navigate(CATALOG_PATH)}></Button>
                                    </div>
                                </div>
                            : <div>
                                {productsInCart.map(product => (
                                    <CartProductCard product={product} />
                                ))}

                                <div style={{ padding: "15px 0 25px", display: "flex", flexDirection: "column", gap: 20 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div style={{ width: "45%", padding: "0 15px", display: "flex", flexDirection: "column", gap: 8 }}>
                                            <p style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 16, color: "var(--secondary-text-color)" }}>Промокод</p>
                                            <input style={{ border: "1px solid #8B8B8B", borderRadius: 4, width: 370, height: 40, padding: "0 5px", fontFamily: "Inter", fontSize: 16, fontWeight: 400, color: "#8B8B8B" }} placeholder="Введите промокод" />
                                        </div>
                                        <div style={{ width: "45%", padding: "0 15px" }}>
                                            <div style={{ display: "flex", padding: "12px 0", justifyContent: "space-between" }}>
                                                <p style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 16, color: "var(--secondary-text-color)" }}>Итого по позициям:</p>
                                                <p style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 16, color: "var(--secondary-text-color)" }}>{totalCost.toLocaleString()} ₽</p>
                                            </div>
                                            <div style={{ display: "flex", padding: "12px 0", justifyContent: "space-between", borderTop: "1px solid #73D982", borderBottom: "1px solid #73D982" }}>
                                                <p style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 16, color: "var(--secondary-text-color)", display: "flex", gap: 5 }}>Доставка <p style={{ color: "var(--primary-bg-color)", borderBottom: "1px solid var(--primary-bg-color)" }}>г. Москва</p></p>
                                                <p style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 16, color: "var(--secondary-text-color)" }}>Бесплатно</p>
                                            </div>
                                            <div style={{ display: "flex", padding: "12px 0", justifyContent: "space-between" }}>
                                                <p style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 20, color: "var(--secondary-text-color)" }}>Итого:</p>
                                                <p style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 20, color: "var(--secondary-text-color)" }}>{totalCost.toLocaleString()} ₽</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ width: "40%", margin: "0 auto" }}>
                                        <Button buttonContent={"Оформить заказ"} clickHandler={() => console.log("Оформление заказа")} />
                                    </div>
                                </div>
                            </div>
                    }

                </div>
            </div>
        </Container>
    )
}

export default Cart;