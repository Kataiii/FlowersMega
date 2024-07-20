import { styled } from "styled-components";
import FilterSection from "../../entities/filter/ui/FilterSection";
import FilterCost from "../../features/filter-cost/FilterCost";
import { Text } from "../../shared/ui/forAdditionalPages/Content";
import { Title } from "../../shared/ui/forAdditionalPages/Title";
import { useFiltersControllerGetAllQuery, useFiltersControllerGetAllWithMaxPriceQuery } from "../../store/filter";

const ContainerFilter = styled.div`
    padding: 24px 16px;
    border-radius: 8px;
    background-color: var(--block-bg-color);
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

const TitleSegment = styled(Text)`
    font-size: 20px;
    font-weight: 400;
`;

type FiltersPanelProps = {
    clearFilters: React.ReactElement;
};

const FiltersPanel: React.FC<FiltersPanelProps> = ({ clearFilters }) => {
    const { isLoading, data } = useFiltersControllerGetAllWithMaxPriceQuery();

    return (
        <ContainerFilter>
            {
                isLoading
                    ? <p>Загрузка...</p>
                    : <>
                        <section style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Title style={{ fontSize: 32 }}>Фильтры</Title>
                            {clearFilters}
                        </section>
                        <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <TitleSegment>Цена</TitleSegment>
                            <FilterCost maxPrice={data?.maxPrice ?? -1} />
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