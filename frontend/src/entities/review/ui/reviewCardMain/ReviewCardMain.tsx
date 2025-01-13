import { ConfigProvider, Rate, Image } from "antd";
import { styled } from "styled-components";
import { API_URL } from "../../../../shared/utils/constants";
import { FullReviewDto } from "../../../../store/review";
import { useState } from "react";
import ReviewModal from "../../../../widgets/ReviewAdminCard/ReviewModal";

type ReviewCardMainProps = {
    review: FullReviewDto;
}

const Container = styled.div`
    width: 550px;
    maxHeight: 393px;
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

const ReviewCardMain: React.FC<ReviewCardMainProps> = ({ review }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onClose = () => {
        setIsModalVisible(false)
    }
    return (
        <Container style={{
            width: "33%",
            height: "350px",
            position: "relative",
            overflow: "hidden",
            transition: "height 0.8s ease-in-out",
        }}>
            <TitleReview>
                {review.product ? (
                    <>
                        {/* @ts-ignore */}
                        <Image style={{ width: 26, height: 26, borderRadius: 4 }} src={`${API_URL}/products/images/${review.product.id}/${review?.product.images[0].url}`} />
                        <Title>{review.product.name}</Title>
                    </>
                ) : (
                    <>
                        <Title>Товар</Title>
                    </>
                )}

            </TitleReview>
            <ContentReview>
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", transition: "height 0.8s ease-in-out", }}>
                        <Name style={{ wordBreak: "break-word" }}>{review.firstname}</Name>
                        <div style={{ display: "flex", gap: 10, alignItems: "center", }}>
                            <p style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 16, color: "var(--secondary-review-text)" }}>{new Date(review.createdAt).toLocaleDateString()}</p>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorText: "var(--primary-bg-color)"
                                    },
                                }}
                            >
                                <Rate style={{ color: "var(--primary-bg-color)", width: "132px" }} value={review.rating} disabled />
                            </ConfigProvider>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: "10px", flexDirection: "column", }}>
                        <div style={{
                            maxHeight: isExpanded ? "250px" : "85px",
                            overflow: "hidden",
                            position: "relative",
                            transition: "max-height 0.8s ease-in-out",
                        }}>
                            <p
                                style={{
                                    margin: 0,
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: 16,
                                    color: "var(--secondary-text-color)",

                                }}
                            >
                                {review.comment}
                            </p>
                            {!isExpanded && (
                                <div
                                    style={{
                                        content: '""',
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "40px",
                                        background: "linear-gradient(to bottom, rgba(255,255,255,0), #FFF)",
                                    }}
                                />
                            )}
                        </div>

                        <button
                            onClick={() => setIsModalVisible(true)}
                            style={{
                                background: "none",
                                border: "none",
                                color: "var(--primary-bg-color)",
                                cursor: "pointer",
                                textAlign: "left",
                                padding: 0,
                                margin: "8px 0",
                            }}
                        >
                            {isExpanded ? "Свернуть" : "Посмотреть полностью"}
                        </button>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    {
                        review.images.map((item, index) => {
                            return <Image width={167} height={100} style={{ borderRadius: 6 }} key={index} src={`${API_URL}/products/images_reviews/${review.id}/${item.url}`} />
                        })
                    }
                </div>
            </ContentReview>
            <ReviewModal isModalVisible={isModalVisible} data={review} onClose={onClose} />
        </Container>
    )
}

export default ReviewCardMain;