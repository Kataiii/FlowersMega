import { Image, Rate } from "antd";
import { FullReviewDto } from "../../../../store/review";
import Error from "../../../../shared/assets/no-image.png";
import { API_URL } from "../../../../shared/utils/constants";

type ReviewCardProductProps = {
    review: FullReviewDto;
}

const ReviewCardProduct: React.FC<ReviewCardProductProps> = ({review}) => {

    return(
        <div style={{borderRadius: 6, height: 276, padding: 10, backgroundColor: "var(--block-bg-color)", display: "flex",flexDirection: "column", gap: 5}}>
            <div style={{display: "flex", alignItems: "center", gap: 12}}>
                <p style={{fontFamily: "Inter", fontWeight: 600, fontSize: 16, color: "var(--primary-review-text)"}}>{review.firstname}</p>
                <p style={{fontFamily: "Inter", fontWeight: 400, fontSize: 16, color: "var(--text-modal)"}}>{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
            <Rate style={{ color: "var(--primary-bg-color)" }} value={review.rating} disabled />
            <div style={{display: "flex", gap: 10}}>
                {
                    review.images.map((item, index) => {
                        return <Image style={{objectFit: "cover", borderRadius: 6}} width={75} height={75} key={`review-image${review.id}-${index}`} fallback={Error} src={`${API_URL}/products/images_reviews/${item.idReview}/${item.url}`}/>
                    })
                }
            </div>
            <div style={{overflow: "hidden"}}>
                <p style={{fontFamily: "Inter", fontSize: 16, fontWeight: 300, color: "var(--secondary-text-color)"}}>{review.comment}</p>
            </div>
        </div>
    )
}

export default ReviewCardProduct;