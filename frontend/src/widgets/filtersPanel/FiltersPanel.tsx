import { styled } from "styled-components";
import FilterSection from "../../entities/filter/ui/FilterSection";
import FilterCost from "../../features/filter-cost/FilterCost";
import { Text } from "../../shared/ui/forAdditionalPages/Content";
import { Title } from "../../shared/ui/forAdditionalPages/Title";
import { useFiltersControllerGetAllWithMaxPriceQuery } from "../../store/filter";
import {ReactComponent as Arrow } from "../../shared/assets/arrow.svg";
import { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { addMaxPrice, addMinPrice } from "../../entities/filter/redux/slice";
import ClearFilters from "../../features/clear-filters/ClearFilters";

const ContainerFilter = styled.div`
    padding: 24px 16px;
    border-radius: 8px;
    background-color: var(--block-bg-color);
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    height: fit-content;
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

const HideDiv = styled.div<{ $isOpen?: boolean; }>`
    padding: 0;
    overflow: hidden;
    max-height: ${props => props.$isOpen ? "100vh" : 0};
    opacity: ${props => props.$isOpen ? 100 : 0};
    transition: 0.5s ease-out;
`;

const FiltersPanel: React.FC = () => {
    const { isLoading, data } = useFiltersControllerGetAllWithMaxPriceQuery();
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const clearPrice = () => {
        dispatch(addMinPrice(0));
        dispatch(addMaxPrice(data?.maxPrice ?? -1));
    }

    return (
        <ContainerFilter>
            {
                isLoading
                    ? <p>Загрузка...</p>
                    : <>
                        <section style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Title style={{ fontSize: 32 }}>Фильтры</Title>
                            <ClearFilters maxPrice={data?.maxPrice ?? -1}/>
                        </section>
                        <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <TitleSegment>Цена</TitleSegment>
                                <div style={{display: "flex", gap: 12, alignItems: "center"}}>
                                    <Button onClick={clearPrice}>Сброс</Button>
                                    <Arrow 
                                        fill="#73D982" 
                                        style={{
                                            cursor: "pointer", 
                                            transform: isOpen ? "rotate(0deg)" : "rotate(180deg)"
                                        }} 
                                        onClick={() => setIsOpen(prev => !prev)}/>
                                </div>
                            </div>
                            <HideDiv $isOpen={isOpen}>
                                <FilterCost maxPrice={data?.maxPrice ?? -1} />
                            </HideDiv>
                        </section>
                        {
                            data && data.filters.map((item, index) => {
                                return <FilterSection filter={item} key={`filter-section-${index}`} />
                            })
                        }
                    </>
            }
        </ContainerFilter>
    )
}

export default FiltersPanel;