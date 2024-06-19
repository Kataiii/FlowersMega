import { styled } from "styled-components";

const Title = styled.h2`
    font-family: "Inter";
    font-size: 32px;
    font-weight: 600;
    color: var(--secondary-text-color);
    margin: 0;
    text-align: left;
`;

interface TitleSectionProps{
    content: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({content}) => {
    return(
        <Title>{content}</Title>
    )
}

export default TitleSection;