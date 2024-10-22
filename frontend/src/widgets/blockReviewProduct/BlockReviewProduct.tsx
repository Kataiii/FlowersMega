import { Carousel, Rate } from "antd";
import { useLayoutEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import Button, { ButtonStyle } from "../../shared/ui/button/Button";
import { Title } from "../../shared/ui/forAdditionalPages/Title";
import { Numerals } from "../../shared/utils/numerals";
import { FullReviewDto, useReviewsProductSizeControllerGetByProductIdQuery } from "../../store/review";
import { ArrowNext, ArrowPrev } from "../blockReviews/BlockReview";
import Arrow from "../../shared/assets/sliderArrow.svg";
import { CarouselRef } from "antd/es/carousel";
import styles from "../blockReviews/BlockReview.module.css";
import SlideReviewsProduct from "../../entities/review/ui/slideReviewsProduct/SlideReviewsProduct";
import AddReview from "../../features/add-review/AddReview";

type BlockReviewProductProps = {
    idProductSize: number;
}

const ContainerRating = styled.div`
    display: flex;
    border-radius: 6px;
    padding: 5px;
    border: 1px solid var(--primary-bg-color);
    gap: 10px;
    background-color: #ffffff00;
`;

const TitleRating = styled.h5`
    font-family: "Inter";
    font-size: 48px;
    font-weight: 600;
    line-height: 55px;
    color: #C5194F;
`;

const BlockReviewProduct: React.FC<BlockReviewProductProps> = ({ idProductSize }) => {
    const { isLoading, data } = useReviewsProductSizeControllerGetByProductIdQuery({ productSizeId: idProductSize, limit: 25, page: 1 });
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const slider = useRef<CarouselRef>(null);
    const [isActivePrev, setIsActivePrev] = useState<boolean>(false);
    const [isActiveNext, setIsActiveNext] = useState<boolean>(true);

    const sliceArray = (array: FullReviewDto[], length: number): FullReviewDto[][] => {
        const tmp: FullReviewDto[][] = [];
        for (let i = 0; i < Math.ceil(array.length / length); i++) {
            tmp[i] = array.slice((i * length), (i * length) + length);
        }
        return tmp;
    }

    useLayoutEffect(() => {
        if (!isLoading) {
            setIsActiveNext((Math.ceil(((data?.count ?? -1) / 3) - 1) > 0));
        }
    }, [isLoading])

    const updateArrows = (current: number) => {
        current === 0 ? setIsActivePrev(false) : setIsActivePrev(true);
        current === (Math.ceil((data?.count ?? -1) / 3) - 1) ? setIsActiveNext(false) : setIsActiveNext(true);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Title style={{ fontSize: 32 }}>Отзывы к товару</Title>
            {
                isLoading
                    ? <p>Загрузка...</p>
                    : <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {
                            isOpen
                                ? <AddReview closeHandler={() => setIsOpen(false)} idProductSize={idProductSize} />
                                : null
                        }
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <ContainerRating>
                                    <TitleRating>{data?.averageRating !== null ? data?.averageRating.toFixed(1) : ""}</TitleRating>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center"
                                    }}>
                                        <Rate style={{ color: "var(--primary-bg-color)" }} value={data?.averageRating ?? 0} disabled />
                                        <p style={{
                                            fontFamily: "Inter",
                                            fontWeight: 600,
                                            fontSize: 14,
                                            color: "#C39696"
                                        }}>{data?.count} {Numerals.numeralsReviews((data?.count ?? -1) % 10)}</p>
                                    </div>
                                </ContainerRating>
                                {/* TODO сортировка */}
                            </div>
                            <div style={{ height: 67, width: 250 }}>
                                <ButtonStyle style={{ height: 67 }} onClick={() => setIsOpen(prev => !prev)}>{isOpen ? "Закрыть форму" : "Оставить отзыв"}</ButtonStyle>
                            </div>
                        </div>
                        <div style={{ position: 'relative' }}>
                            {
                                !isActivePrev
                                    ? null
                                    : <ArrowPrev src={Arrow} onClick={() => slider.current?.prev()} />
                            }
                            <Carousel afterChange={updateArrows} ref={slider} className={styles.carousel} arrows={false} infinite={false}>
                                {
                                    sliceArray(data?.reviews ?? [], 3).map((item, index) => {
                                        return <SlideReviewsProduct key={`wrap_slider-${index}`} reviews={item} />
                                    })
                                }
                            </Carousel>
                            {
                                !isActiveNext
                                    ? null
                                    : <ArrowNext src={Arrow} onClick={() => slider.current?.next()} />
                            }
                        </div>
                    </div>
            }
        </div>
    )
}

export default BlockReviewProduct;