import SecondaryButton, { ButtonStyle } from "../../../shared/ui/button/SecondaryButton";
import { Text } from "../../../shared/ui/forAdditionalPages/Content";
import { Title } from "../../../shared/ui/forAdditionalPages/Title";
import { Order } from "../../../store/order";
import { ReactComponent as ReOrder } from "../../../shared/assets/reOrder.svg";
import { styled } from "styled-components";
import { Numerals } from "../../../shared/utils/numerals";
import { useState } from "react";
import { ReactComponent as Arrow } from "../../../shared/assets/arrow.svg";
import CardOrderProduct from "../../product/ui/cardOrderProduct/CardOrderProduct";

type OrderCardProps = {
    order: Order;
}

const Button = styled(ButtonStyle)`
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    height: 28px;
`;

const HideDiv = styled.div<{ $isOpen?: boolean; }>`
    padding: 0;
    overflow: hidden;
    max-height: ${props => props.$isOpen ? "100vh" : 0};
    opacity: ${props => props.$isOpen ? 100 : 0};
    transition: 0.5s ease-out;
`;

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    //@ts-ignore
    const [countItemOrders, _] = useState<number>(order.itemsOrder.reduce((count, currentItem) => { return count + (currentItem.OrderProductSize.count ?? -1); }, 0));
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const postcardsArray = Array.isArray(order.postcards)
        ? order.postcards
        : typeof order.postcards === "string"
            ? JSON.parse(order.postcards)
            : [];
    return (
        <div style={{ width: "100%", border: "1px solid var(--primary-bg-color)", padding: 16, borderRadius: 6, marginBottom: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <Title style={{ display: "inline", fontSize: 20, fontWeight: 600 }}>Заказ №{order.name}</Title>
                        <Text style={{ display: "inline", fontSize: 16, fontWeight: 400, color: "var(--text-modal)" }}>от {new Date(order.dateOrder).toLocaleDateString()}</Text>
                    </div>
                    <div style={{ width: "fit-content" }}>
                        <Button>Повторить заказ <ReOrder alt="re-order" /></Button>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <Text style={{ fontWeight: 600, fontSize: 14, color: "var(--text-modal)" }}>{countItemOrders} {Numerals.numeralsProducts(countItemOrders)} на</Text>
                        <Text style={{ fontWeight: 600, fontSize: 24 }}>{order.cost.toLocaleString()} ₽</Text>
                    </div>
                    <div>
                        <Arrow onClick={() => setIsOpen(prev => !prev)} fill="#73D982" style={{ width: 60, cursor: "pointer", height: 45, transform: isOpen ? "rotate(0deg)" : "rotate(180deg)" }} alt="arrow" />
                    </div>
                </div>
            </div>
            <HideDiv $isOpen={isOpen}>
                {
                    order.itemsOrder.map((item, index) => {
                        return <CardOrderProduct key={`card-order-product-${index}`} orderItem={item} postcards={postcardsArray} />
                    })
                }
            </HideDiv>
        </div>
    )
}

export default OrderCard;