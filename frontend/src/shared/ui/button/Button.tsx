import { styled } from "styled-components";
import "../../utils/cssConstants.css"

export interface ButtonProps{
    buttonContent: string;
    clickHandler: () => void;
}

export const ButtonStyle = styled.button`
    background-color: var(--primary-bg-color);
    width: 100%;
    color: var(--primary-text-color);
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    padding: 12px 16px;
    border-radius: 6px;
    border: none;

    &:hover{
        background-color: var(--primary-bg-color-hover);
    }
`

const Button: React.FC<ButtonProps> = ({buttonContent, clickHandler}) => {
    return(
        <ButtonStyle onClick={clickHandler}>{buttonContent}</ButtonStyle>
    )
}

export default Button;