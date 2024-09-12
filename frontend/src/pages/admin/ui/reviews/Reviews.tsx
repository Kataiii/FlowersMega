import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Rate, Select, Space, Image } from "antd";
import OrderContainer from "../../../../shared/ui/orderContainer/OrderContainer";
import Container from "../../../../shared/ui/containerMain/ContainerMain";
import { useEffect, useMemo, useState } from "react";
import { useReviewsControllerGetAllQuery, useReviewsControllerGetAllWithPaginationQuery } from "../../../../store/review";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../../../shared/utils/constants"
import ReviewAdminCard from "../../../../widgets/ReviewAdminCard/ReviewAdminCard";


const Reviews: React.FC = () => {
    const [searchId, setSearchId] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("");
    const { data: reviews } = useReviewsControllerGetAllWithPaginationQuery({ page: 1, limit: 10 });

    const reviewData = useMemo(() => {
        if (!reviews) return [];
        return reviews.reviews.map((review) => ({
            ...review,
        }));
    }, [reviews]);



    const filteredData = useMemo(() => {
        if (!searchId) return reviewData;
        return reviewData.filter((review) =>
            review?.firstname?.toLowerCase().includes(searchId.toLowerCase())
        );
    }, [searchId, reviewData]);

    const sortedData = useMemo(() => {
        const sorted = [...filteredData];
        switch (sortOrder) {
            case "rateDESC":
                return sorted.sort((a, b) => a.rating - b.rating);
            case "rateASC":
                return sorted.sort((a, b) => b.rating - a.rating);
            case "dateNew":
                return sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            case "dateOld":
                return sorted.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
            default:
                return sorted;
        }
    }, [filteredData, sortOrder]);

    return (
        <Container style={{ backgroundColor: "var(--main-bg-color)" }}>
            <h1 style={{ display: "flex", margin: "16px 0 0 16px" }}>Отзывы</h1>
            <OrderContainer>
                <h2 style={{ display: "flex", margin: "8px" }}>База заказов</h2>

                <div style={{ border: "1px solid var(--primary-bg-color)", borderRadius: "10px", padding: "5px" }}>
                    <Space.Compact size="large" block>
                        <Input
                            placeholder="Поиск"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                        <Button type="primary" icon={<SearchOutlined />}>Найти</Button>
                    </Space.Compact>
                </div>

                <div style={{ display: "flex" }}>
                    <p style={{ color: "var(--secondary-bg-color)", marginRight: "10px" }}>Сортировать по</p>
                    <Select
                        allowClear
                        style={{ width: 150, height: 25 }}
                        options={[
                            { value: "dateNew", label: "Дата (новые)" },
                            { value: "dateOld", label: "Дата (старые)" },
                            { value: "rateASC", label: "Рейтинг (выше)" },
                            { value: "rateDESC", label: "Рейтинг (ниже)" },
                        ]}
                        placeholder="Выбрать"
                        value={sortOrder}
                        onChange={(value) => setSortOrder(value)}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px" }}>
                    {sortedData.map((review) => (
                        <ReviewAdminCard key={review.id} review={review} />
                    ))}
                </div>

            </OrderContainer>
        </Container>
    );
};

export default Reviews;
