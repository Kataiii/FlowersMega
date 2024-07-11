import { styled } from "styled-components";
import { ButtonProps } from "./Button";

export const ButtonStyle = styled.button`
    background-color: #ffffff00;
    width: fit-content;
    color: var(--primary-bg-color);
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    padding: 12px 16px;
    border: none;
    cursor: pointer;

    &:hover{
        color: var(--primary-bg-color-hover);
    }
`

const TextButton: React.FC<ButtonProps> = ({buttonContent, clickHandler}) => {
    return(
        <ButtonStyle onClick={clickHandler}>{buttonContent}</ButtonStyle>
    )
}

export default TextButton;