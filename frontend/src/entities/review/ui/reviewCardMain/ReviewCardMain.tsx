import { ConfigProvider, Rate, Image } from "antd";
import { styled } from "styled-components";
import { API_URL } from "../../../../shared/utils/constants";
import { FullReviewDto } from "../../../../store/review";

type ReviewCardMainProps = {
    review: FullReviewDto;
}

const Container = styled.div`
    width: 550px;
    height: 393px;
    padding: 15px;
    border-radius: 14px;
    background-color: var(--block-bg-color);
`;

const TitleReview = styled.div`
    width: 100%;
    padding: 8px;
    border-bottom: 2px solid var(--primary-bg-color);
    display: flex;
    gap: 8px;
`;

const ContentReview = styled.div`
    padding: 15px 15px 0;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-between;
`;

const Title = styled.h3`
    font-family: "Inter";
    font-weight: 700;
    font-size: 20px;
    color: var(--primary-bg-color);
`;

const Name = styled.h3`
    font-family: "Inter";
    font-weight: 600;
    font-size: 20px;
    color: var(--primary-review-text);
`

const ReviewCardMain: React.FC<ReviewCardMainProps> = ({review}) => {
    return(
        <Container>
            <TitleReview>
                {/* @ts-ignore */}
                <img style={{width: 26, height: 26, borderRadius: 4}} src={`${API_URL}/products/images/${review.product.id}/${review?.product.images[0].url}`}/>
                <Title>{review.product.name}</Title>
            </TitleReview>
            <ContentReview>
                <div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Name>{review.firstname}</Name>
                        <div style={{display: "flex", gap: 10, alignItems: "center"}}>
                            <p style={{fontFamily: "Inter", fontWeight: 600, fontSize: 16, color: "var(--secondary-review-text)"}}>{new Date(review.createdAt).toLocaleDateString()}</p>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorText: "var(--primary-bg-color)"
                                    },
                                }}
                            >
                                <Rate style={{ color: "var(--primary-bg-color)" }} value={review.rating} disabled/>
                            </ConfigProvider>
                        </div>
                    </div>
                    <p style={{fontFamily: "Inter", fontWeight: 400, fontSize: 16, color: "var(--secondary-text-color)", padding: "0 0 8px"}}>{review.comment}</p>
                </div>
                <div style={{display: "flex", gap: 10}}>
                    {
                        review.images.map((item,index) => {
                            return <Image width={167} height={100} style={{borderRadius: 6}} key={index} src={`${API_URL}/products/images_reviews/${review.id}/${item.url}`}/>
                        })
                    }
                </div>
            </ContentReview>
        </Container>
    )
}

export default ReviewCardMain;