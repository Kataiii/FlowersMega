import { Carousel, Pagination } from "antd";
import { useEffect, useRef, useState } from "react";
import Container from "../../shared/ui/containerMain/ContainerMain"
import TitleSection from "../../shared/ui/titleSection/TitleSection";
import { FullReviewDto, useReviewsControllerGetAllWithPaginationQuery } from "../../store/review";
import Arrow from "../../shared/assets/sliderArrow.svg";
import styles from "./BlockReview.module.css";
import { styled } from "styled-components";
import SlideReviews from "../../entities/review/ui/slideReviews/SlideReviews";
import { CarouselRef } from "antd/es/carousel";
import ReviewCardMain from "../../entities/review/ui/reviewCardMain/ReviewCardMain";

export const ArrowNext = styled.img`
    width: 50px;
    height: 50px;
    position: absolute;
    z-index: 10;
    top: 50%; 
    left: 100%;
    transform: translate(-50%, 0) rotate(180deg); 
    cursor: pointer;
`;

export const ArrowPrev = styled(ArrowNext)`
    left: 0;
    transform: translate(-50%, 0) rotate(0); 
`;

const BlockReviews: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [reviews, setReviews] = useState<FullReviewDto[]>([]);
    const [pageSize, setPageSize] = useState<number>(3);
    const { isLoading, data } = useReviewsControllerGetAllWithPaginationQuery({ page: page, limit: pageSize, field: "updatedAt", type: "ASC" });
    const slider = useRef<CarouselRef>(null);
    const [isActivePrev, setIsActivePrev] = useState<boolean>(false);
    const [isActiveNext, setIsActiveNext] = useState<boolean>(true);

    // useEffect(() => {
    //     if (!isLoading && data) {
    //         if (page === 1) {
    //             setReviews(data.reviews);
    //         } else {
    //             setReviews(prevReviews => [...prevReviews, ...data.reviews.filter(r => !prevReviews.find(p => p.id === r.id))]);
    //         }
    //     }
    // }, [isLoading, page]);

    const clickHandler = (current: number) => {
        const allPages = Math.ceil((data?.count ?? -1) / 9);
        if (page < allPages && current === (Math.ceil(reviews.length / 3) - 2)) {
            setPage(page => page + 1);
        }
    }

    const sliceArray = (array: FullReviewDto[], length: number): FullReviewDto[][] => {
        const tmp: FullReviewDto[][] = [];
        for (let i = 0; i < Math.ceil(array.length / length); i++) {
            tmp[i] = array.slice((i * length), (i * length) + length);
        }
        return tmp;
    }

    const updateArrows = (current: number) => {
        current === 0 ? setIsActivePrev(false) : setIsActivePrev(true);
        current === (Math.ceil((data?.count ?? -1) / 3) - 1) ? setIsActiveNext(false) : setIsActiveNext(true);
    }

    const handlePageChange = (newPage: number, newPageSize?: number) => {
        setPage(newPage);

    };

    return (
        <Container>
            <TitleSection content="Отзывы клиентов" />
            {
                isLoading
                    ? <p>Загрузка...</p>
                    :
                    <>
                        <div style={{ position: "relative", display: "flex", flexDirection: "row", gap: "6px" }}>
                            {
                                <>
                                    {
                                        page === Math.ceil((data?.count ?? 0) / pageSize) ? null : <ArrowNext src={Arrow} onClick={() => setPage(prev => prev + 1)} />
                                    }

                                    {console.log(data?.count)}
                                    {
                                        data?.reviews.map((item, index) => {
                                            return <ReviewCardMain key={`review_card-${index}`} review={item} />
                                        })
                                    }
                                    {
                                        page === 1 ? null : <ArrowPrev src={Arrow} onClick={() => setPage(prev => prev - 1)} />
                                    }
                                </>
                            }
                        </div>
                    </>
            }
        </Container>
    )
}

export default BlockReviews;