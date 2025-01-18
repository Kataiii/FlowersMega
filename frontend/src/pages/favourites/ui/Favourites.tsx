import { useNavigate } from "react-router-dom";
import { favoritesSelectors } from "../../../entities/favorites/redux/selectors";
import Button from "../../../shared/ui/button/Button";
import Container from "../../../shared/ui/containerMain/ContainerMain"
import { CATALOG_PATH } from "../../../shared/utils/constants";
import { useAppSelector } from "../../../store/store";
import { BlockGrid } from "../../../widgets/blockProducts/BlockProducts";
import { SmartProductCard } from "../../../widgets/product/SmartProductCart";
import { SmartProductCardCatalog } from "../../../widgets/product/SmartProductCardCatalog";

const Favourites: React.FC = () => {
    const productsFavorite = useAppSelector(favoritesSelectors.selectAll);
    const navigate = useNavigate();

    return (
        <Container style={{ margin: "0 auto", flexGrow: 3, padding: "35px 0" }}>
            <h1 style={{ fontFamily: "Inter", fontSize: 32, fontWeight: 600, color: "var(--secondary-text-color)" }}>Избранное</h1>
            {
                productsFavorite.length === 0
                    ? <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 25 }}>
                        <h2 style={{ fontFamily: "Inter", fontSize: 16, fontWeight: 400, color: "var(--secondary-text-color)" }}>Нет избранных товаров</h2>
                        <div style={{ width: "fit-content" }}>
                            <Button buttonContent={"Перейти в каталог"} clickHandler={() => navigate(CATALOG_PATH)}></Button>
                        </div>
                    </div>
                    : <BlockGrid>
                        {
                            productsFavorite.map((item, index) => {
                                return <SmartProductCardCatalog key={index} product={item} />
                            })
                        }
                    </BlockGrid>
            }
        </Container>
    )
}

export default Favourites;