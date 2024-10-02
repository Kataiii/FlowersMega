import React, { useState } from "react";
import Container from "../../../shared/ui/containerMain/ContainerMain";
import { FilterWithItems, useFiltersControllerGetAllQuery } from "../../../store/filter";
import { Category } from "../../../store/product";
import { useNavigate } from "react-router-dom";
import { CATALOG_PATH } from "../../../shared/utils/constants";

type FilterPanelProps = {
    category: Category;
};

const FilterPanel: React.FC<FilterPanelProps> = ({ category }) => {
    const { isLoading, data } = useFiltersControllerGetAllQuery();
    const navigate = useNavigate();


    return (
        <Container>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ display: "flex", flexDirection: "row", gap: "25px", marginTop: "15px" }}>
                    {data &&
                        data.map((filter) => (
                            <div
                                key={filter.id}
                                style={{
                                    border: "1px solid var(--primary-bg-color)",
                                    borderRadius: "4px",
                                    padding: "8px",
                                    cursor: "pointer",
                                    width: "200px",
                                    flexWrap: "wrap",
                                    flexDirection: "column",
                                    fontFamily: "Inter"
                                }}
                            >
                                <div style={{ fontWeight: "bold" }}>{filter.name}</div>
                                <div style={{ marginTop: "8px" }}>
                                    {filter.items.map((item) => (
                                        <div
                                            key={item.id}
                                            style={{
                                                display: "flex",


                                                padding: "4px",
                                                cursor: "pointer",
                                                marginBottom: "8px",
                                                fontFamily: "Inter",

                                            }}
                                            onClick={() => {
                                                navigate(`${CATALOG_PATH}/${category.name}/${item.name}`, {
                                                    // state: { previousLocation: locate.pathname },
                                                });
                                            }}
                                        >
                                            {item.name}
                                        </div>
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
