import { Checkbox, ConfigProvider } from "antd";
import { styled } from "styled-components";
import { Text } from "../../../shared/ui/forAdditionalPages/Content";
import { FilterWithItems } from "../../../store/filter";

type FilterSectionProps = {
    filter: FilterWithItems;
}

const TitleSegment = styled(Text)`
    font-size: 20px;
    font-weight: 400;
`;

const FilterSection: React.FC<FilterSectionProps> = ({filter}) => {
    return(
        <section style={{display: "flex", flexDirection: "column", gap: 16}}>
            <div>
                <TitleSegment>{filter.name}</TitleSegment>
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
                <Checkbox.Group style={{display: "flex", flexDirection: "column", gap: 12}} options={filter.items.map(item => {return {label: item.name, value: item.id ?? -1}})}/>
            </ConfigProvider>
        </section>
    )
}

export default FilterSection;