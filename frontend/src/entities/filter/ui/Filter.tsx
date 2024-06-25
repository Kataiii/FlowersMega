import { styled } from "styled-components";
import Arrow from "../../../shared/assets/arrow.svg";

type FilterProps = {
    clearFilter: React.ReactElement;
    filterName: string;
    itemsFilter: React.ReactElement;
}

const FilterTitle = styled.h4`
    font-family: "Inter";
    font-weight: 400;
    font-size: 20px;
    margin: 0;
    color: var(--secondary-text-color);
`;

const ContainerTitle = styled.div`
    width: 100%;
    justify-content: space-between;
`;

const Image = styled.img`
    
`;

const ContainerItems = styled.div`
    
`;

const Filter: React.FC<FilterProps> = ({clearFilter, filterName, itemsFilter}) => {
    return(
        <>
            <ContainerTitle>
                <FilterTitle>{filterName}</FilterTitle>
                <div>
                    {clearFilter}
                    <Image src={Arrow} alt="arrow"/>
                </div>
            </ContainerTitle>
            <ContainerItems>
                {
                    itemsFilter
                }
            </ContainerItems>
        </>
    )
}

export default Filter;