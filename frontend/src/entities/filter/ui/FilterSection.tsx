import { Checkbox, CheckboxProps, ConfigProvider } from "antd";
import { styled } from "styled-components";
import { Text } from "../../../shared/ui/forAdditionalPages/Content";
import { FilterWithItems } from "../../../store/filter";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { selectFilters } from "../redux/selectors";
import { addOneToFilters, deleteManyFromFilters, deleteOneFromFilters } from "../redux/slice";
import { ReactComponent as Arrow } from "../../../shared/assets/arrow.svg";
import { useState } from "react";

type FilterSectionProps = {
    filter: FilterWithItems;
}

const HideDiv = styled.div<{ $isOpen?: boolean; }>`
    padding: 0;
    overflow: hidden;
    max-height: ${props => props.$isOpen ? "100vh" : 0};
    opacity: ${props => props.$isOpen ? 100 : 0};
    transition: 0.5s ease-out;
`;

const TitleSegment = styled(Text)`
    font-size: 20px;
    font-weight: 400;
`;

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

const FilterSection: React.FC<FilterSectionProps> = ({filter}) => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(selectFilters);
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const onChange: CheckboxProps['onChange'] = (e) => {
        if(e.target.checked)dispatch(addOneToFilters(e.target.value));
        else dispatch(deleteOneFromFilters(e.target.value));
    };

    const clearFilter = () => {
        dispatch(deleteManyFromFilters(filter.items[0]));
    }

    return(
        <section style={{display: "flex", flexDirection: "column", gap: 16}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <TitleSegment>{filter.name}</TitleSegment>
                <div style={{display: "flex", gap: 12, alignItems: 'center'}}>
                    <Button onClick={clearFilter}>Сброс</Button>
                    <Arrow 
                        fill="#73D982" 
                        style={{
                            cursor: "pointer", 
                            transform: isOpen ? "rotate(0deg)" : "rotate(180deg)"
                        }} 
                        onClick={() => setIsOpen(prev => !prev)}/>
                </div>
            </div>
            <ConfigProvider
            theme={{
                token: {
                    fontFamily: "Inter",
                    fontSize: 16,
                    fontWeightStrong: 400,
                    margin: 0
                },
            }}
            >
                <HideDiv $isOpen={isOpen}
                    style={{display: "flex", flexDirection: "column", gap: 12}} 
                >
                    {
                        filter.items.map((item, index) => {
                            return <Checkbox 
                                        checked={filters.find(i => i.id === item.id) !== undefined ? true : false}
                                        key={`filter-checkbox-${index}-${item.id}`} 
                                        value={item} 
                                        onChange={onChange}
                                    >{item.name}</Checkbox>
                        })
                    }
                </HideDiv>
            </ConfigProvider>
        </section>
    )
}

export default FilterSection;