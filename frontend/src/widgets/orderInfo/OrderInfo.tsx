import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { cartSelectors, selectTotalCount } from "../../entities/cart/redux/selectors";
import ProductOrderInfo from "../../entities/product/ui/productOrderInfo/ProductOrderInfo";
import Button from "../../shared/ui/button/Button";
import { Text } from "../../shared/ui/forAdditionalPages/Content";
import { Title } from "../../shared/ui/forAdditionalPages/Title";
import { CART_PATH } from "../../shared/utils/constants";
import { useAppSelector } from "../../store/store";

const Container = styled.div`
    border-radius: 6px;
    padding: 16px 16px 24px;
    background-color: var(--block-bg-color);
    width: 32%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

const OrderInfo: React.FC = () => {
    const navigate = useNavigate();
    const productsInCart = useAppSelector(cartSelectors.selectAll);
    const totalCost = useMemo(
        () => productsInCart.map(p => p.count * (p.prise ?? 0)).reduce((prev, curr) => prev + curr, 0),
        [productsInCart]
    )

    return(
        <Container>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Title style={{fontSize: 24}}>Ваш заказ</Title>
                <div style={{width: 110}}>
                    <Button buttonContent="Изменить" clickHandler={() => navigate(CART_PATH)}/>
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: 16}}>
                {
                    productsInCart.map((item, index) => {
                        return <ProductOrderInfo key={`product-info-${index}`} product={item}/>
                    })
                }
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: 16}}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={{fontSize: 16, fontWeight: 400, color: "var(--text-modal)"}}>Подытог:</Text>
                    <Text style={{fontSize: 16, fontWeight: 400}}>{totalCost.toLocaleString()} ₽ </Text>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={{fontSize: 16, fontWeight: 400, color: "var(--text-modal)"}}>Доставка:</Text>
                    <Text style={{fontSize: 16, fontWeight: 400}}> Бесплатно </Text>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Title style={{fontSize: 24}}>Итого:</Title>
                <Title style={{fontSize: 24}}>{totalCost.toLocaleString()} ₽ </Title>
            </div>
        </Container>
    )
}

export default OrderInfo;