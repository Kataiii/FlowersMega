import { Input, Skeleton, Spin } from "antd";
import { useMemo, useState } from "react";
import { styled } from "styled-components";
import { Title } from "../../../../shared/ui/forAdditionalPages/Title";
import { City, useCitiesControllerGetAllQuery } from "../../../../store/city";
import { useAppDispatch } from "../../../../store/store";
import { addCity } from "../../redux/slice";
import { ReactComponent as Search } from "../../../../shared/assets/search.svg";
import { Filters } from "../../../../shared/utils/filters";

const RadioButton = styled.div<{ $primary?: boolean; }>`
    width: 180px;
    border-radius: 6px;
    padding: 5px 16px;
    font-family: "Inter";
    font-weight: 500;
    font-size: 16px;
    color: var(--secondary-text-color);
    background-color: ${props => props.$primary ? "var(--city-active)" : "var(--block-bg-color)"};
    cursor: pointer;

    &:hover{
        background-color: ${props => props.$primary ? "var(--city-active-hover)" : "var(--block-bg-color-hover)"};
    }
`

type CityPanelProps = {
    activeCity: City | null;
};

const CityPanel: React.FC<CityPanelProps> = ({ activeCity }) => {
    const { isLoading, data } = useCitiesControllerGetAllQuery();

    const [city, setCity] = useState<City | null>(activeCity);
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState<string>("");

    const cityClickHandler = (city: City) => {
        setCity(city);
        dispatch(addCity(city));
    }

    const seachChange = (e: any) => {
        setSearch(e.target.value);
    }

    const cities = useMemo(() =>
        Filters.filtersCities(data ?? [], search)
        , [isLoading, search])

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 32 }}>
            <Title>Город доставки</Title>
            <Input
                size="large"
                placeholder="Введите название города"
                prefix={<Search />}
                onChange={seachChange} />
            {
                isLoading
                    ? <Skeleton active />
                    : <div style={{ maxWidth: 680, display: "flex", flexWrap: "wrap", gap: 24, padding: "10 0", border: "none" }}>
                        {
                            data && cities.map((item, index) => {
                                return <RadioButton onClick={() => cityClickHandler(item)} $primary={(city?.id ?? -1) === item.id} key={`city-radio-${index}`}>{item.name}</RadioButton>
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default CityPanel;