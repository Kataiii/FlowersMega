import { useNavigate } from "react-router";
import { styled } from "styled-components";
import BannerImageSrc from "../../shared/assets/banner.png";
import Button from "../../shared/ui/button/Button";
import { CATALOG_PATH } from "../../shared/utils/constants";

const Container = styled.div`
    position: absolute;
    width: 90%;
`;

const BannerImage = styled.img`
    width: 100%;
`;

const Title = styled.h1`
    font-family: "Inter";
    font-size: 48px;
    font-weight: 600;
    color: var(--primary-text-color);
`;

const Content = styled(Title)`
    font-size: 24px;
`

const Banner: React.FC = () => {
    const navigate = useNavigate();

    return(
        <Container>
            <BannerImage src={BannerImageSrc}/>
            <div style={{position: "absolute",  top: "40%", left: "20%", transform: "translate(-50%, -25% )", display: "flex", flexDirection: "column", gap: "15px"}}>
                <Title>Твой букет <br/> всё скажет за тебя</Title>
                <Content>Радуйте близких по любому поводу</Content>
                <Button buttonContent={"Перейти в каталог"} clickHandler={() => navigate(CATALOG_PATH)}/>
            </div>
        </Container>
    )
}

export default Banner;