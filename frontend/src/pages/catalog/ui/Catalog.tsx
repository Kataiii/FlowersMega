import { Pagination } from "antd";
import { selectFilters, selectMaxPrice, selectMinPrice } from "../../../entities/filter/redux/selectors";
import Container from "../../../shared/ui/containerMain/ContainerMain";
import { useProductsSizesControllerGetAllQuery, useProductsSizesControllerGetByCategotyIdWithPaginationQuery } from "../../../store/product";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import FiltersPanel from "../../../widgets/filtersPanel/FiltersPanel";
import FiltersTags from "../../../widgets/filtersTags/FiltersTags";
import { SmartProductCard } from "../../../widgets/product/SmartProductCart";
import { useState } from "react";

const Catalog: React.FC = () => {
    const filters = useAppSelector(selectFilters)
        .map(item => item.id)
        .filter((id): id is number => id !== undefined);
    const minPrice = useAppSelector(selectMinPrice);
    const maxPrice = useAppSelector(selectMaxPrice);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    console.log(filters, "filters");
    // const { isLoading, data } = useProductsSizesControllerGetAllQuery();
    const { isLoading, data } = useProductsSizesControllerGetByCategotyIdWithPaginationQuery({ limit: pageSize, page: page, filterItems: filters, minPrice: minPrice, maxPrice: maxPrice });

    const handlePageChange = (newPage: number, newPageSize?: number) => {
        setPage(newPage);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "25px 0" }}>
            <Container>
                <h1 style={{ fontFamily: "Inter", fontSize: 32, fontWeight: 600, color: "var(--secondary-text-color)" }}>Каталог</h1>
                <div style={{ display: "flex", gap: 30 }}>
                    <FiltersPanel />
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <FiltersTags />
                        <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", }}>
                            {
                                isLoading
                                    ? <p>Загрузка...</p>
                                    : data && data.products.map((item, index) => {
                                        return <SmartProductCard key={index} product={item} />
                                    })
                            }
                        </div>

                    </div>
                </div>
                <div style={{ width: "100%" }}>
                    <Pagination total={data?.count || 0} pageSize={pageSize} current={page} onChange={handlePageChange} style={{ textAlign: "center" }} />
                </div>
            </Container>
        </div>
    )
}

export default Catalog;