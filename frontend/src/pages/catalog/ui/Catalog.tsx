import Container from "../../../shared/ui/containerMain/ContainerMain";
import { useProductsSizesControllerGetAllQuery } from "../../../store/product";
import FiltersPanel from "../../../widgets/filtersPanel/FiltersPanel";
import FiltersTags from "../../../widgets/filtersTags/FiltersTags";
import { SmartProductCard } from "../../../widgets/product/SmartProductCart";

const Catalog: React.FC = () => {
    const { isLoading, data } = useProductsSizesControllerGetAllQuery();

    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "25px 0" }}>
            <Container>
                <h1 style={{ fontFamily: "Inter", fontSize: 32, fontWeight: 600, color: "var(--secondary-text-color)" }}>Каталог</h1>
                <div style={{display: "flex", gap: 30}}>
                    <FiltersPanel/>
                    <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                        <FiltersTags/>
                        <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
                            {
                                isLoading
                                    ? <p>Загрузка...</p>
                                    : data && data.map((item, index) => {
                                        return <SmartProductCard key={index} size={item} />
                                    })
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Catalog;