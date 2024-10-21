import { FullReviewDto } from "../../../../store/review";
import ReviewCardProduct from "../reviewCardProduct/ReviewCardProduct";


type SlideReviewsProps = {
    reviews: FullReviewDto[];
}

const SlideReviewsProduct: React.FC<SlideReviewsProps> = ({reviews}) => {
    return(
        <div style={{width: "100%", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10}}>
        {
            reviews.map((item,index) => {
                return <ReviewCardProduct key={`review_card-${index}`} review={item}/>
            })
        }
        </div>
    )
}

export default SlideReviewsProduct;