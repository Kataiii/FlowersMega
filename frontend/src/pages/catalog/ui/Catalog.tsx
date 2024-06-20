import Container from "../../../shared/ui/containerMain/ContainerMain";
import { useProductsSizesControllerGetAllQuery } from "../../../store/product";
import BlockProducts from "../../../widgets/blockProducts/BlockProducts";
import { SmartProductCard } from "../../../widgets/product/SmartProductCart";

const Catalog: React.FC = () => {
    const { isLoading, data } = useProductsSizesControllerGetAllQuery();

    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "25px 0" }}>
            <Container>
                <h1 style={{ fontFamily: "Inter", fontSize: 32, fontWeight: 600, color: "var(--secondary-text-color)" }}>Каталог</h1>
                <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
                    {
                        isLoading
                            ? <p>Загрузка...</p>
                            : data && data.map((item, index) => {
                                return <SmartProductCard key={index} size={item} />
                            })
                    }
                </div>
            </Container>
        </div>
    )
}

export default Catalog;