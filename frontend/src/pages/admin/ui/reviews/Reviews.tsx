import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, Pagination } from "antd";
import OrderContainer from "../../../../shared/ui/orderContainer/OrderContainer";
import Container from "../../../../shared/ui/containerMain/ContainerMain";
import { useMemo, useState, useCallback, useEffect } from "react";
import { useReviewsControllerGetAllWithPaginationQuery } from "../../../../store/review";
import { ButtonText, NameContainer, NamePage } from "../products/Products";
import { SortText } from "../orders/Orders";
import ReviewAdminCard from "../../../../widgets/ReviewAdminCard/ReviewAdminCard";
import { Debouncer } from "../../../../shared/utils/debounce";

const Reviews: React.FC = () => {
    const [searchId, setSearchId] = useState<string>("");
    const [finalSearchId, setFinalSearchId] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("rating ASC");
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(4);
    const [shouldFetch, setShouldFetch] = useState<boolean>(false);

    const { data: reviews, refetch } = useReviewsControllerGetAllWithPaginationQuery(
        { page, limit: pageSize, search: finalSearchId, field: sortOrder.split(' ')[0], type: sortOrder.split(' ')[1] },
    );

    const debouncer = new Debouncer();

    const debouncedSearch = useCallback(
        debouncer.debounce((searchValue: string) => {
            setFinalSearchId(searchValue);
            setPage(1);
            setShouldFetch(true);
        }, 2000), []
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchValue = e.target.value;
        setSearchId(newSearchValue);
        debouncedSearch(newSearchValue);
    };

    useEffect(() => {
        if (shouldFetch) {
            refetch();
            setShouldFetch(false);
        }
    }, [finalSearchId, shouldFetch, refetch]);

    const handleSearchButtonClick = () => {
        setFinalSearchId(searchId);
        setPage(1);
        setShouldFetch(true);
    };

    const handleSortChange = (value: string) => {
        setSortOrder(value);
        setPage(1);
        setShouldFetch(true);
    };

    const reviewData = useMemo(() => {
        if (!reviews) return [];
        return reviews.reviews.map((review) => ({
            ...review,
        }));
    }, [reviews]);

    const sortedData = useMemo(() => {
        const sorted = [...reviewData];
        // switch (sortOrder) {
        //     case "rating DESC":
        //         return sorted.sort((a, b) => b.rating - a.rating);
        //     case "rating ASC":
        //         return sorted.sort((a, b) => a.rating - b.rating);
        //     case "updatedAt ASC":
        //         return sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        //     case "updatedAt DESC":
        //         return sorted.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
        //     default:
        //         return sorted;
        // }
        return sorted;
    }, [reviewData, sortOrder]);

    const refetchReviews = () => {
        refetch();
    };

    const handlePageChange = (newPage: number, newPageSize?: number) => {
        setPage(newPage);
        if (newPageSize) {
            setPageSize(newPageSize);
        }
        setShouldFetch(true);
    };

    return (
        <Container style={{ backgroundColor: "var(--main-bg-color)" }}>
            <h1 style={{ display: "flex", margin: "16px 0 0 16px" }}>
                <NamePage>Отзывы</NamePage>
            </h1>
            <OrderContainer>
                <div style={{ display: "flex", margin: "8px" }}>
                    <NameContainer>База отзывов</NameContainer>
                </div>

                <div style={{ border: "1px solid var(--primary-bg-color)", borderRadius: "10px", padding: "5px" }}>
                    <Space.Compact size="large" block>
                        <Input
                            placeholder="Поиск"
                            value={searchId}
                            onChange={handleSearchChange}
                        />
                        <Button style={{ width: "150px" }} type="primary" onClick={handleSearchButtonClick}>
                            <ButtonText style={{ display: "inline" }}>Найти <SearchOutlined /></ButtonText>
                        </Button>
                    </Space.Compact>
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ color: "var(--secondary-bg-color)", marginRight: "10px", paddingTop: "5px" }}>
                        <SortText>Сортировать по</SortText>
                    </div>
                    <Select

                        defaultActiveFirstOption={true}
                        defaultValue="rating ASC"
                        style={{ width: 150, height: 25 }}
                        options={[
                            { value: "updatedAt ASC", label: "Дата (старые)" },
                            { value: "updatedAt DESC", label: "Дата (новые)" },
                            { value: "rating ASC", label: "Рейтинг (по возрастанию)" },
                            { value: "rating DESC", label: "Рейтинг (по убванию)" },
                        ]}
                        placeholder="Выбрать"
                        value={sortOrder}
                        onChange={handleSortChange}
                    />
                </div>

                {/* TODO убрать высоту*/}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "repeat(2, 1fr)", gap: "10px" }}>
                    {sortedData.map((review) => (
                        <ReviewAdminCard key={review.id} review={review} refetchReviews={refetchReviews} />
                    ))}
                </div>
                <Pagination
                    style={{ marginTop: "16px", textAlign: "center", display: "block" }}
                    current={page}
                    total={reviews?.count}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                />
            </OrderContainer>
        </Container>
    );
};

export default Reviews;
