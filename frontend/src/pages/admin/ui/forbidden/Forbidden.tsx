import { styled } from "styled-components";
import PrimaryText from "../../../../shared/ui/primaryText/PrimaryText";
import { Button } from "antd";
import { ButtonText } from "../products/Products";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_PATH } from "../../../../shared/utils/constants";

const Container = styled.div`
        width: "100%";
        height: "100vh"; 
        display: "flex";
        justify-content: "center";
        align-items: "center";
        text-align: "center";
`

const Forbidden: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div style={{ overflow: "hidden", display: 'flex', justifyContent: "center", alignItems: 'center', height: "100vh", flexDirection: 'column', gap: "25px" }}>
            <PrimaryText style={{ fontSize: "24px" }}>У вас недостаточно прав</PrimaryText>
            <Button type="primary" onClick={() => navigate(HOME_PATH)}><ButtonText>Вернуться на главную страницу</ButtonText></Button>
        </div>

    )
}

export default Forbidden;