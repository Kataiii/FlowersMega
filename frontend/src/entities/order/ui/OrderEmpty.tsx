import { useNavigate } from "react-router-dom";
import SecondaryButton from "../../../shared/ui/button/SecondaryButton";
import { Text } from "../../../shared/ui/forAdditionalPages/Content";
import { Title } from "../../../shared/ui/forAdditionalPages/Title";
import { CATALOG_PATH } from "../../../shared/utils/constants";

const OrderEmpty: React.FC = () => {
    const navigate = useNavigate();

    return(
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 15}}>
            <Title>Нет заказов</Title>
            <Text>Чтобы сделать заказ, добавьте товар в корзину</Text>
            <div style={{width: "20%"}}>
                <SecondaryButton buttonContent={"Перейти в каталог"} clickHandler={() => navigate(CATALOG_PATH)}/>
            </div>
        </div>
    )
}

export default OrderEmpty;