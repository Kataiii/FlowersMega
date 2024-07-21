import { styled } from "styled-components";
import { addMaxPrice, addMinPrice, deleteAllFromFilters } from "../../entities/filter/redux/slice";
import { useAppDispatch } from "../../store/store";

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

type ClearFiltersProps = {
    maxPrice: number;
};

const ClearFilters: React.FC<ClearFiltersProps> = ({maxPrice}) => {
    const dispatch = useAppDispatch();

    const clickHandler = () => {
        dispatch(addMinPrice(0));
        dispatch(addMaxPrice(maxPrice));
        dispatch(deleteAllFromFilters());
    }

    return(
        <Button onClick={clickHandler}>Сбросить всё</Button>
    );
}

export default ClearFilters;