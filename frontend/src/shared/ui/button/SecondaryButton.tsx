import { styled } from "styled-components";
import { ButtonProps } from "./Button";

export const ButtonStyle = styled.button`
    background-color: var(--block-bg-color);
    width: 100%;
    color: var(--primary-bg-color);
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    padding: 12px 16px;
    border-radius: 6px;
    border: 1px solid #FF749F;

    &:hover{
        background-color: var(--block-bg-color-hover);
    }
`

const SecondaryButton: React.FC<ButtonProps> = ({buttonContent, clickHandler}) => {
    return(
        <ButtonStyle onClick={clickHandler}>{buttonContent}</ButtonStyle>
    )
}

export default SecondaryButton;