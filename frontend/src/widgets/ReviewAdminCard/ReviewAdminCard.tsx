import { useState } from "react";
import { API_URL } from "../../shared/utils/constants";
import { FullReviewDto } from "../../store/review";
import { Button, Rate, Image, Flex } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

interface ReviewAdminCardProps {
    review: FullReviewDto;
}

const ReviewAdminCard: React.FC<ReviewAdminCardProps> = ({ review }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();
    const locate = useLocation();

    return (
        <div
            style={{
                width: "370px",
                // marginBottom: "20px",
                minHeight: "200px",
                position: "relative",
                overflow: "hidden",
            }}
            key={review.id}
        >
            <div style={{
                border: "1px solid var(--primary-bg-color)",
                borderRadius: "6px",
                padding: "10px",
            }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                    }}
                >
                    <div>{review.firstname}</div>
                    <div style={{ color: "darkgray" }}>
                        {/* @ts-ignore */}
                        {review.phone}
                    </div>
                    <div style={{ color: "darkgray" }}>
                        {new Date(review.createdAt).toLocaleDateString('ru-ru', {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </div>
                </div>
                <div>
                    <Rate
                        style={{ color: "var(--primary-bg-color)" }}
                        value={review.rating}
                    />
                    <div style={{ margin: "10px 0", display: "flex", gap: "10px" }}>
                        {review.images.slice(0, 3).map((item, index) => (
                            <Image
                                width={75}
                                height={75}
                                style={{ borderRadius: 6 }}
                                key={index}
                                src={`${API_URL}/products/images_reviews/${review.id}/${item.url}`}
                            />
                        ))}
                    </div>
                </div>

                <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                    <div style={{
                        maxHeight: isExpanded ? "none" : "85px",
                        overflow: "hidden",
                        position: "relative",
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
                        onClick={() => setIsExpanded(!isExpanded)}
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

                <Button
                    type="primary"
                    style={{ backgroundColor: "var(--primary-bg-color)" }}
                    onClick={() => {
                        navigate(`/admin/review/${review.id}`, {
                            state: { previousLocation: locate.pathname },
                        });
                    }}
                >
                    Редактировать
                </Button>
            </div>

        </div>
    )
}

export default ReviewAdminCard;
