import { styled } from "styled-components";

const Button = styled.button<{ $primary?: boolean; }>`
    width: 100%;
    height: 40px;
    background-color: ${props => props.$primary ? "var(--primary-bg-color)" : "var(--block-bg-color)"};
    border-radius: 4px;
    padding: 0 8px;
    display: flex;
    gap: 8px;
    align-items: center;
    font-family: "Inter";
    font-weight: 400;
    font-size: 14px;
    color: ${props => props.$primary ? "var(--primary-text-color)" : "var(--secondary-text-color)"};
    border: none;

    &:hover{
        background-color: ${props => props.$primary ? "var(--primary-bg-color-hover)" : "var(--block-bg-color-hover)"};
    }
`;

export type ButtonWithIconProps = {
    content: string;
    icon: JSX.Element;
    activeIcon?: JSX.Element;
    onCLick: () => void;
    isActive: boolean;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({content, icon, activeIcon, onCLick, isActive}) => {
    return(
        <Button $primary={isActive} onClick={onCLick}>
            {isActive && activeIcon ? activeIcon: icon}
            {content}
        </Button>
    )
}

export default ButtonWithIcon;