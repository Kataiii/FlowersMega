import { useMemo } from "react";
import CardAdvantage, { CardAdvantageProps } from "../../shared/ui/cardAdvantage/CardAdvantage";
import Container from "../../shared/ui/containerMain/ContainerMain"
import TitleSection from "../../shared/ui/titleSection/TitleSection";
import { ReactComponent as Recycle } from "../../shared/assets/recycle.svg";
import { ReactComponent as Delivery } from "../../shared/assets/delivery.svg";
import { ReactComponent as Call } from "../../shared/assets/call.svg";
import { ReactComponent as Like } from "../../shared/assets/like_main.svg";
import { styled } from "styled-components";

const Content = styled.p`
    font-family: "Inter";
    font-size: 20px;
    font-weight: 400;
    color: var(--secondary-text-color);
    margin: 0;
    text-align: left;
`;

const BlockAdvantages: React.FC = () => {
    const advantages: CardAdvantageProps[] = useMemo(() => [
        {
            image: <Recycle/>,
            content: "Работаем без посредников"
        },
        {
            image: <Delivery/>,
            content: "Доставка по всей Росии"
        },
        {
            image: <Call/>,
            content: "Доставляем по номеру телефона"
        },
        {
            image: <Like/>,
            content: "100% гарантия качества"
        }
    ], []);

    return(
        <Container>
            <TitleSection content="Почему стоит выбрать нас?"/>
            <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", justifyContent: "space-between", gap: "20px"}}>
                {
                    advantages.map((item, index) => {
                        return <CardAdvantage key={index} image={item.image} content={item.content}/>
                    })
                }
            </div>
            <Content>Наша команда состоит из специалистов в области флористики, дизайна, продаж, логистики и маркетинга. У нас всегда представлен широкий ассортимент цветов. Наш каталог насчитывает много десятков наименований букетов которые порадуют ваших близких.</Content>
        </Container>
    )
}

export default BlockAdvantages;