import { favoritesSelectors } from "../../../entities/favorites/redux/selectors";
import Container from "../../../shared/ui/containerMain/ContainerMain"
import { useAppSelector } from "../../../store/store";
import { SmartProductCard } from "../../../widgets/product/SmartProductCart";

const Favourites: React.FC = () => {
    const productsFavorite = useAppSelector(favoritesSelectors.selectAll);

    return(
        <div style={{display: "flex", justifyContent: "center", padding: "25px 0"}}>
            <Container>
                <h1 style={{fontFamily: "Inter", fontSize: 32, fontWeight: 600, color: "var(--secondary-text-color)"}}>Избранное</h1>
                <div style={{display: "flex", gap: 15, flexWrap: "wrap"}}>
                {
                    productsFavorite.map((item, index) => {
                        return <SmartProductCard key={index} size={item} />
                    })
                }
                </div>
            </Container>
        </div>
    )
}

export default Favourites;