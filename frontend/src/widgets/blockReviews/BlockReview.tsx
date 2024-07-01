import { Carousel } from "antd";
import { useEffect, useRef, useState } from "react";
import Container from "../../shared/ui/containerMain/ContainerMain"
import TitleSection from "../../shared/ui/titleSection/TitleSection";
import { FullReviewDto, useReviewsControllerGetAllWithPaginationQuery } from "../../store/review";
import Arrow  from "../../shared/assets/sliderArrow.svg";
import styles from "./BlockReview.module.css";
import { styled } from "styled-components";
import SlideReviews from "../../entities/review/ui/slideReviews/SlideReviews";
import { CarouselRef } from "antd/es/carousel";

const ArrowNext = styled.img`
    width: 50px;
    height: 50px;
    position: absolute;
    z-index: 10;
    top: 50%; 
    left: 100%;
    transform: translate(-50%, 0) rotate(180deg); 
    cursor: pointer;
`;

const ArrowPrev = styled(ArrowNext)`
    left: 0;
    transform: translate(-50%, 0) rotate(0); 
`;

const BlockReviews: React.FC = () => {
    const [ page, setPage ] = useState<number>(1);
    const [reviews, setReviews] = useState<FullReviewDto[]>([]);
    const {isLoading, data} = useReviewsControllerGetAllWithPaginationQuery({page: page, limit: 9});
    const slider = useRef<CarouselRef>(null);
    const [isActivePrev, setIsActivePrev] = useState<boolean>(false);
    const [isActiveNext, setIsActiveNext] = useState<boolean>(true);

    useEffect(() => {
        if(!isLoading && page === 1){
            setReviews(data?.reviews ?? []);
        }
        //TODO неправильно приходят данные в карусель
        else if(!isLoading){
            console.log(data?.reviews);
            const tmpFull: FullReviewDto[] = [...reviews, ...data?.reviews ?? []];
            let tmp: FullReviewDto[] = [];
            for(const review of tmp){
                console.log("hhhhhhhhhhhhhh");
                console.warn(!~tmp.findIndex(r => r.id == review.id));
                if(!~tmp.findIndex(r => r.id == review.id)) tmp.push(review);
            }
            setReviews(tmp);
            console.log(tmpFull);
            console.log(reviews);
        }
    }, [isLoading, page]);

    const clickHandler = (current: number) => {
        const allPages = Math.ceil((data?.count ?? -1) / 9);
        if(page < allPages && current === (Math.ceil(reviews.length / 3) - 2)){
            setPage(page => page + 1);
        }
    }

    const sliceArray = (array: FullReviewDto[], length: number): FullReviewDto[][] => {
        const tmp: FullReviewDto[][] = [];
        for (let i = 0; i <Math.ceil(array.length/length); i++){
            tmp[i] = array.slice((i*length), (i*length) + length);
        }
        return tmp;
    }

    const updateArrows = (current: number) => {
        current === 0 ? setIsActivePrev(false) : setIsActivePrev(true);
        current === (Math.ceil((data?.count ?? -1) / 3) - 1) ? setIsActiveNext(false) : setIsActiveNext(true);
    }

    return(
        <Container>
            <TitleSection content="Отзывы клиентов"/>
            {
                isLoading
                ?   <p>Загрузка...</p>
                :   <div style={{position: 'relative'}}>
                        {
                            !isActivePrev
                            ? null
                            : <ArrowPrev src={Arrow} onClick={() => slider.current?.prev()}/>
                        }
                        <Carousel beforeChange={clickHandler} afterChange={updateArrows} ref={slider} className={styles.carousel} arrows={false} infinite={false}>
                        {
                            sliceArray(reviews, 3).map((item, index) => {
                                return <SlideReviews key={`wrap_slider-${index}`} reviews={item}/>
                            })
                        }
                        </Carousel>
                        {
                            !isActiveNext
                            ? null
                            : <ArrowNext src={Arrow} onClick={() => slider.current?.next()}/>
                        }
                    </div>
            }
        </Container>
    )
}

export default BlockReviews;