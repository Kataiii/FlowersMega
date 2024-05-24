import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { Badge } from 'antd';

const Container = styled.div<{$active?: boolean;}>`
    width: 40px;
    height: 40px;
    background-color: ${props => props.$active ? "var(--primary-bg-color)" : "var(--block-bg-color)"};
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--primary-bg-color);
    border-radius: 6px;
    cursor: pointer;

    &:hover{
        background-color: ${props => props.$active ? "var(--primary-bg-color-hover)" : "var(--block-bg-color-hover)"};
    }
`;

export interface ButtonIconProps{
    icon: JSX.Element;
    clickHandler: () => void;
    activeIcon?: JSX.Element;
    typeEqual?: string;
    count?: number;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({icon, activeIcon, clickHandler, typeEqual, count}) => {
    const locate = useLocation();

    return(
        <Badge count={count} offset={[-40, 0]} color="#73D982">
            <Container $active={locate.pathname === typeEqual} onClick={clickHandler}>
                
                {(locate.pathname === typeEqual) && activeIcon ? activeIcon : icon}
            </Container>
        </Badge>
    )
}

export default ButtonIcon;