import { FullReviewDto } from "../../../../store/review"
import ReviewCardMain from "../reviewCardMain/ReviewCardMain";

type SlideReviewsProps = {
    reviews: FullReviewDto[];
}

const SlideReviews: React.FC<SlideReviewsProps> = ({reviews}) => {
    return(
        <div style={{width: "100%", display: "flex", justifyContent: "start", gap: 10}}>
        {
            reviews.map((item,index) => {
                return <ReviewCardMain key={`review_card-${index}`} review={item}/>
            })
        }
        </div>
    )
}

export default SlideReviews;
