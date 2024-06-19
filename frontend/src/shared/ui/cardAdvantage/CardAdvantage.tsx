import { styled } from "styled-components";

const Container = styled.div`
    font-family: "Inter";
    font-size: 24px;
    font-weight: 600;
    color: var(--primary-text-color);
    background-color: var(--primary-bg-color);
    margin: 0;
    text-align: center;
    padding: 24px;
    border-radius: 6px;
`;

export interface CardAdvantageProps{
    image: JSX.Element;
    content: string;
} 

const CardAdvantage: React.FC<CardAdvantageProps> = ({image, content}) => {
    return(
        <Container>
            {
                image
            }
            <p>{content}</p>
        </Container>
    )
}

export default CardAdvantage;