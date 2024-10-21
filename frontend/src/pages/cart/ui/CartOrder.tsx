import { useNavigate } from "react-router-dom";
import { selectTotalCount } from "../../../entities/cart/redux/selectors";
import Button from "../../../shared/ui/button/Button";
import Container from "../../../shared/ui/containerMain/ContainerMain";
import { CATALOG_PATH } from "../../../shared/utils/constants";
import { useAppSelector } from "../../../store/store";
import FormOrder from "../../../widgets/formOrder/FormOrder";
import OrderInfo from "../../../widgets/orderInfo/OrderInfo";

const CartOrder: React.FC = () => {
    const cartTotal = useAppSelector(selectTotalCount);
    const navigate = useNavigate();

    return(
        <Container style={{margin: "0 auto", flexGrow: 3, padding: "35px 0"}}>
            <h1 style={{fontFamily: "Inter", fontSize: 32, fontWeight: 600, color: "var(--secondary-text-color)"}}>Оформление заказа</h1>
            {
                cartTotal === 0
                ?   <div style={{width: "100%", height: "100%", padding: 45, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 25}}>
                        <h2 style={{fontFamily: "Inter", fontSize: 16, fontWeight: 400, color: "var(--secondary-text-color)"}}>Корзина пуста</h2>
                        <p style={{fontFamily: "Inter", fontSize: 14, fontWeight: 400, color: "var(--secondary-text-color)"}}>Для выбора товаров перейдите в каталог</p>
                        <div style={{width: "fit-content"}}>
                            <Button buttonContent={"Перейти в каталог"} clickHandler={() => navigate(CATALOG_PATH)}></Button>
                        </div>
                    </div>
                :   <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                        <div style={{width: "60%"}}>
                            <FormOrder/>
                        </div>
                        <OrderInfo/>
                    </div>
            }
        </Container>
    )
}

export default CartOrder;