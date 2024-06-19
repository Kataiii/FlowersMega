import Banner from "../../../widgets/banner/Banner";
import BlockAdvantages from "../../../widgets/blockAdvantages/BlockAdvantages";
import BlockCategories from "../../../widgets/blockCategories/BlockCategories";
import BlockProducts from "../../../widgets/blockProducts/BlockProducts";
import BlockReviews from "../../../widgets/blockReviews/BlockReview";

const Main: React.FC = () => {
    return(
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "25px", padding: "30px 0"}}>
            <Banner/>
            <BlockCategories/>
            <BlockProducts/>
            <BlockReviews/>
            <BlockAdvantages/>
        </div>
        
    )
}

export default Main;