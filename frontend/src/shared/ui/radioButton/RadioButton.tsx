import { styled } from "styled-components";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";

const RadioButtonStyle = styled.button<{$primary?: boolean;}>`
    width: 100%;
    border-radius: 4px;
    padding: 8px;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: "Inter";
    font-size: 14px;
    font-weight: 400;
    background-color: ${props => props.$primary ? "var(--primary-bg-color)" : "var(--block-bg-color)"};
    color: ${props => props.$primary ? "var(--primary-text-color)" : "var(--secondary-text-color)"};
    cursor: pointer;
`;

type RadioButtonProps = {
    content: string;
    value: string | number;
    isActive: boolean;
    clickHandler: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ content, value, isActive,clickHandler }) => {
    return(
        <RadioButtonStyle $primary={isActive} onClick={clickHandler}>
            <p>{content}</p>
            {
                isActive
                ?   <Arrow fill="#FFFFFF" style={{transform: "rotate(90deg)"}}/>
                :   <Arrow fill="#73D982" style={{transform: "rotate(90deg)"}}/>
            }
        </RadioButtonStyle>
    )
}

export default RadioButton;