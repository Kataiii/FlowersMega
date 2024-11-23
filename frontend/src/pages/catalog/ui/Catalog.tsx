import { Pagination } from "antd";
import { selectFilters, selectMaxPrice, selectMinPrice } from "../../../entities/filter/redux/selectors";
import Container from "../../../shared/ui/containerMain/ContainerMain";
import { useCategoryControllerGetIdByNameQuery, useProductsSizesControllerGetByCategotyIdWithPaginationQuery } from "../../../store/product";
import { useAppSelector } from "../../../store/store";
import FiltersPanel from "../../../widgets/filtersPanel/FiltersPanel";
import FiltersTags from "../../../widgets/filtersTags/FiltersTags";
import { SmartProductCard } from "../../../widgets/product/SmartProductCart";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProductContext } from "../../../shared/ui/secondHeader/ProductContext";
import { useSizeContollerGetByNameQuery } from "../../../store/size";

const Catalog: React.FC = () => {
    const filters = useAppSelector(selectFilters)
        .map(item => item.id)
        .filter((id): id is number => id !== undefined);
    const [searchParams] = useSearchParams();
    const categoryD = searchParams.get('category');
    const decodedCategory = categoryD ? decodeURIComponent(categoryD) : '';
    const { selectedProduct } = useProductContext();
    const { setCategory, category } = useProductContext();
    setCategory(decodedCategory);
    const { data: categoryIdData } = useCategoryControllerGetIdByNameQuery({ name: categoryD ? categoryD : 'null' });
    const minPrice = useAppSelector(selectMinPrice);
    const maxPrice = useAppSelector(selectMaxPrice);
    const [pageSize, setPageSize] = useState(30);
    const [page, setPage] = useState(1);
    const { data: postcardId } = useSizeContollerGetByNameQuery({ name: "-" });
    const { isLoading, data } = useProductsSizesControllerGetByCategotyIdWithPaginationQuery({ limit: pageSize, page: page, search: selectedProduct ? selectedProduct : '', filterItems: filters, minPrice: minPrice, maxPrice: maxPrice, category: categoryD ? Number(categoryIdData) : undefined });
    console.log(postcardId, "POSTCRRD SIE ID")
    console.log(data?.products.filter(item => item.productSize.idSize === 5))

    const handlePageChange = (newPage: number, newPageSize?: number) => {
        setPage(newPage);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "25px 0" }}>
            <Container>
                <h1 style={{ fontFamily: "Inter", fontSize: 32, fontWeight: 600, color: "var(--secondary-text-color)" }}>Каталог</h1>
                <div style={{ display: "flex", gap: 30 }}>
                    <FiltersPanel />
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
                        <FiltersTags />
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
                            gridColumnGap: "5px",
                            gap: "10px"
                        }}>
                            {
                                isLoading
                                    ? <p>Загрузка...</p>
                                    : data && data.products.map((item, index) => item.productSize.idSize == postcardId ? (
                                        <>
                                            {console.log(1)}
                                            <SmartProductCard key={`productSizes-${index}`} product={item} />

                                        </>
                                    ) : null)
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