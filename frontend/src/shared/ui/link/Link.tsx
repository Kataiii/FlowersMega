import { styled } from "styled-components";
import { targetA } from "../../utils/constants";
import "../../utils/cssConstants.css";

const LinkStyled = styled.a`
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    color: var(--primary-bg-color);
    text-decoration: none;
`;

export interface LinkProps{
    content: string;
    href: string;
    target: targetA;
}

const Link: React.FC<LinkProps> = ({content, href, target}) => {
    return(
        <LinkStyled href={href} target={String(target)}>{content}</LinkStyled>
    );
}

export default Link;