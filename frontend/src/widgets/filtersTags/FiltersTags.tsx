import { ConfigProvider, Tag } from "antd";
import { selectFilters } from "../../entities/filter/redux/selectors";
import { deleteOneFromFilters } from "../../entities/filter/redux/slice";
import { ItemFilter } from "../../store/product";
import { useAppDispatch, useAppSelector } from "../../store/store";

const FiltersTags: React.FC = () => {
    const filters = useAppSelector(selectFilters);
    const dispatch = useAppDispatch();

    const closeHandler = (filter: ItemFilter) => {
        dispatch(deleteOneFromFilters(filter));
    }

    console.log(filters);

    return (
        <>
            <ConfigProvider
                theme={{
                components: {
                    Tag: {
                        defaultBg: "var(--city-active)",
                        defaultColor: "var(--secondary-text-color)"
                    },
                },
                token: {
                    fontFamily: "Inter",
                    margin: 0
                }
                }}
            >
            {
                filters.length === 0
                    ? null
                    :<div style={{ width: "100%", display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {
                            filters.map((item, index) => {
                                return <Tag
                                    style={{padding: 5, fontSize: 12, margin: 0}}
                                    key={`filters-tags-${item.id}`}
                                    closeIcon
                                    onClose={() => closeHandler(item)}>{item.name}</Tag>
                            })
                        }
                    </div>
            }
            </ConfigProvider>
        </>
    )
}

export default FiltersTags;