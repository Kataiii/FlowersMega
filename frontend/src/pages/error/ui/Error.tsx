import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import ErrorImage from "../../../shared/assets/error.svg";
import Container from "../../../shared/ui/containerMain/ContainerMain";
import { CATALOG_PATH, HOME_PATH } from "../../../shared/utils/constants";

const PrimaryText = styled.h1`
    font-family: "Inter";
    font-weight: 600;
    font-size: 32px;
    color: var(--primary-bg-color);
    text-align: center;
`;

const Text = styled.p<{ $primary?: boolean; }>`
    width: fit-content;
    display: flex;
    font-family: "Inter";
    font-weight: 600;
    font-size: 20px;
    color: ${props => props.$primary ? "var(--primary-bg-color)" : "var(--secondary-text-color)"};
    cursor: ${props => props.$primary ? "pointer" : "text"};
    text-align: center;
`;

const Error: React.FC = () => {
    const navigate = useNavigate();

    return(
        <Container style={{margin: '0 auto', flexGrow: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 15}}>
            <img style={{width: '35%', display: 'block'}} src={ErrorImage} alt="error"/>
            <PrimaryText>Страница не найдена</PrimaryText>
            <div style={{width: "70%", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 5}}>
                <Text>Такой страницы не существует, или она была удалена.</Text>
                <Text>Проверьте правильность написания страницы, или перейдите на </Text>
                <Text $primary onClick={() => navigate(HOME_PATH)}>главную<Text>, </Text></Text>
                <Text>в </Text>
                <Text $primary onClick={() => navigate(CATALOG_PATH)}>каталог товаров<Text>, </Text></Text>
                <Text>или воспользуйтесь поиском</Text>
            </div>
        </Container>
    )
}

export default Error;