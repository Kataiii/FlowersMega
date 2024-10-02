import { useNavigate } from "react-router";
import { styled } from "styled-components";
import BannerImageSrc from "../../shared/assets/banner.png";
import Button from "../../shared/ui/button/Button";
import { CATALOG_PATH } from "../../shared/utils/constants";

const Container = styled.div`
    position: relative;
    width: 90%;
`;

const BannerImage = styled.img`
    width: 100%;
    @media screen and (max-device-width: 420px) {
        width: 100vw;    
        margin: 10px -50px
        // transform: translate(-10%, -10% );
    }
`;

const StyledContainer = styled.div`
    position: absolute;
    top: 30%;
    left: 10%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    transform: translate(-10%, -15% );
    @media (max-width: 1260px) {
        position: absolute;
        left: 10%;
        top: 40%;
        transform: translate(-10%, -35% );
    }
    @media (max-device-width: 420px) {
        position: absolute;
        left: 35%;
        top: 40%;
         transform: translate(-80%, -35% );
    }
    
`

const StyledButton = styled(Button)`
    display: flex;
    width: 10%;
`

const Title = styled.h1`
    font-family: "Inter";
    font-size: 48px;
    font-weight: 600;
    color: var(--primary-text-color);
    @media (max-width: 1260px) and (min-width: 550px) {
        font-size: 24px;
    }
`;

const Content = styled(Title)`
    font-size: 24px;
    @media (max-width: 1260px) and (min-width: 550px) {
        font-size: 16px;
    }
`

const Banner: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <BannerImage src={BannerImageSrc} />
            <StyledContainer >
                <Title>Твой букет <br /> всё скажет за тебя</Title>
                <Content>Радуйте близких по любому поводу</Content>
                <StyledButton buttonContent={"Перейти в каталог"} clickHandler={() => navigate(CATALOG_PATH)} />
            </StyledContainer>
        </Container>
    )
}

export default Banner;