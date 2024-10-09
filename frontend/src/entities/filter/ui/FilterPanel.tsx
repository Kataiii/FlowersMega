import React from "react";
import Container from "../../../shared/ui/containerMain/ContainerMain";
import { useFiltersControllerGetAllQuery } from "../../../store/filter";
import { Category, ItemFilter } from "../../../store/product";
import { createSearchParams, useNavigate } from "react-router-dom";
import { CATALOG_PATH } from "../../../shared/utils/constants";
import { useDispatch } from "react-redux";
import { addAllToFilters, addOneToFilters } from "../redux/slice";
import { Button } from "antd";


type FilterPanelProps = {
    category: Category;
};

const FilterPanel: React.FC<FilterPanelProps> = ({ category }) => {
    const { isLoading, data } = useFiltersControllerGetAllQuery();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSelectAll = (filterItems: ItemFilter[]) => {
        dispatch(addAllToFilters(filterItems));

        const searchParams = createSearchParams(
            filterItems.reduce((acc: Record<string, string>, item: ItemFilter) => {
                if (item.id) acc[`itemId_${item.id}`] = item.id.toString();
                return acc;
            }, {})
        ).toString();

        navigate({
            pathname: `${CATALOG_PATH}`,
            // search: searchParams,
        });
    };

    return (
        <Container>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",

                        flexWrap: "wrap",
                        gap: "25px",
                        marginTop: "15px",
                        fontFamily: "Inter",
                    }}
                >
                    {data &&
                        data.map((filter) => (
                            <div
                                key={filter?.id}
                                style={{
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    width: "32%",
                                    minWidth: "310px",
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "24px",
                                        fontFamily: "Inter",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        marginTop: "10px",
                                    }}
                                >
                                    {filter?.name}
                                    <Button
                                        style={{
                                            padding: "4px 0",
                                            cursor: "pointer",
                                            margin: "8px 0",
                                            border: "none",
                                            fontWeight: "bold",
                                            fontSize: "16px",
                                            fontFamily: "Inter",
                                        }}

                                        onClick={() => handleSelectAll(filter?.items || [])}
                                    >
                                        Выбрать все
                                    </Button>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        maxHeight: "500px",
                                        gap: "6px",
                                        marginTop: "8px",
                                        alignContent: "flex-start",
                                        fontFamily: "Inter ",
                                    }}
                                >
                                    {filter?.items?.map((item) => (
                                        <Button
                                            key={item?.id}
                                            style={{
                                                width: "32%",
                                                padding: "4px 0",
                                                cursor: "pointer",
                                                margin: "10px 0",
                                                border: "none",
                                                textAlign: "left",
                                                fontSize: "16px",
                                                fontFamily: "Inter",
                                                wordBreak: "break-word",
                                                whiteSpace: "normal"
                                            }}
                                            onClick={() => {
                                                if (item?.id && filter?.id) {
                                                    dispatch(
                                                        addOneToFilters({
                                                            id: item.id,
                                                            idFilter: filter.id,
                                                            name: item.name,
                                                        })
                                                    );

                                                    navigate({
                                                        pathname: `${CATALOG_PATH}`,
                                                        // search: createSearchParams({
                                                        //     filterId: filter.id.toString(),
                                                        //     itemId: item.id.toString(),
                                                        // }).toString(),
                                                    });
                                                }
                                            }}
                                        >
                                            {item?.name}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </Container>
    );
};

export default FilterPanel;
