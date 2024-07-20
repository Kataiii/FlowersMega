import { styled } from "styled-components";

const Button = styled.button`
    font-family: "Inter";
    font-weight: 400;
    font-size: 12px;
    color: var(--text-modal);
    background-color: #ffffff00;
    border: none;
    border-bottom: 1px solid var(--text-modal);
    cursor: pointer;
`;

const ClearFilters: React.FC = () => {
    return(
        <Button>Сбросить всё</Button>
    );
}

export default ClearFilters;