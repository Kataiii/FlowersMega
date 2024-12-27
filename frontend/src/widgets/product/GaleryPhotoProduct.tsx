import { Image } from "antd";
import Error from "../../shared/assets/no-image.png";
import { API_URL } from "../../shared/utils/constants";
import { Product, useCategoriesProductsControllerGetAllQuery, useCategoryControllerGetIdByNameQuery } from "../../store/product";
import CardCategory from "../../entities/category/ui/cardCategory/CardCategory";
import Additions from "./Additions";
import DecorsAddition from "./DecorsAddition";
import { useCategoriesControllerGetByIdQuery } from "../../store/category";
import { useEffect, useState } from "react";
import AdditionProductCard from "../../entities/product/ui/AdditionProductCard/AdditionProductCard";
import { Title } from "../../shared/ui/forAdditionalPages/Title";
import CenteredSpin from "../../shared/ui/spinner/CenteredSpin";

type GaleryPhotoProductProps = {
    product?: Product;
}

const GaleryPhotoProduct: React.FC<GaleryPhotoProductProps> = ({ product }) => {
    const { data: categoryIdData, isLoading } = useCategoryControllerGetIdByNameQuery({ name: "Открытки" });
    const { data: categoryIdDatA } = useCategoryControllerGetIdByNameQuery({ name: "Мягкие игрушки" });
    const { data: categoryIdDataB } = useCategoryControllerGetIdByNameQuery({ name: "Шары" });
    const { data: categoryIdDataC } = useCategoryControllerGetIdByNameQuery({ name: "Топперы" });
    const { data: ToppersAddition } = useCategoriesControllerGetByIdQuery({ id: Number(categoryIdDataC) });
    const { data: DecorsAdditionCat } = useCategoriesControllerGetByIdQuery({ id: Number(categoryIdDatA) });
    const { data: PostcardAddition } = useCategoriesControllerGetByIdQuery({ id: Number(categoryIdData) });
    const { isLoading: isLoadingCountPostcards, data: countPostcards } = useCategoriesProductsControllerGetAllQuery({ id: Number(categoryIdData) ?? -1 });
    const { isLoading: isLoadingCountToys, data: countToys } = useCategoriesProductsControllerGetAllQuery({ id: Number(categoryIdDatA) ?? -1 });
    const { isLoading: isLoadingCountBalloons, data: countBalloons } = useCategoriesProductsControllerGetAllQuery({ id: Number(categoryIdDataB) ?? -1 });
    const { isLoading: isLoadingCountToppers, data: countToppers } = useCategoriesProductsControllerGetAllQuery({ id: Number(categoryIdDataC) ?? -1 });
    const [decor, setDecor] = useState<number>((Number(countBalloons) || 0) + (Number(countToys) || 0));
    const [isPostcardsOpen, setIsPostcardsOpen] = useState(false);
    const [isToppersOpen, setIsToppersOpen] = useState(false);
    const [isDecorsOpen, setIsDecorsOpen] = useState(false);

    useEffect(() => {
        setDecor((Number(countBalloons) || 0) + (Number(countToys) || 0));
    }, [countBalloons, countToys])
    return (
        <>
            {isLoading ? (<CenteredSpin />)
                : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "45%" }}>
                        {/* @ts-ignore */}
                        <Image fallback={Error} style={{ width: "100%", borderRadius: 6 }} src={`${API_URL}/products/images/${product?.id}/${product?.images[0].url}`} alt="image1" />
                        <div style={{ display: "flex", width: 568, gap: 20 }}>
                            {
                                //@ts-ignore
                                product?.images.map((item, index) => {
                                    if (index === 0) return;
                                    return <Image fallback={Error} style={{ width: 124, height: 124, borderRadius: 6 }} src={`${API_URL} /products / images / ${product?.id} /${item.url}`} key={index} alt={index} />
                                })
                            }
                        </div>
                        {
                            // @ts-ignore
                            product.categories[0].id === Number(categoryIdDataC) ||
                                // @ts-ignore
                                product.categories[0].id === Number(categoryIdDatA) ||
                                // @ts-ignore
                                product.categories[0].id === Number(categoryIdDataB) ? (
                                null
                            ) : (
                                <>
                                    <Title style={{ fontSize: 32 }}>Добавьте к букету </Title>
                                    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                        {/* <Button onClick={() => setIsToppersOpen(true)}>Топперы</Button>
                                        <Button onClick={() => setIsPostcardsOpen(true)}>Открытки</Button>
                                        <Button onClick={() => setIsDecorsOpen(true)}>Декор</Button> */}
                                        <AdditionProductCard category={ToppersAddition ? ToppersAddition : null} clickHandler={() => setIsToppersOpen(true)} name={"Топперы"} count={Number(countToppers)} />
                                        <AdditionProductCard category={PostcardAddition ? PostcardAddition : null} clickHandler={() => setIsPostcardsOpen(true)} name={"Открытки"} count={Number(countPostcards)} />
                                        <AdditionProductCard category={DecorsAdditionCat ? DecorsAdditionCat : null} clickHandler={() => setIsDecorsOpen(true)} name={"Декор"} count={Number(decor)} />
                                    </div>
                                </>

                            )}
                        <Additions isOpen={isToppersOpen} setIsOpen={setIsToppersOpen} categoryName="Топперы" />
                        <Additions isOpen={isPostcardsOpen} setIsOpen={setIsPostcardsOpen} categoryName="Открытки" />
                        <DecorsAddition isOpen={isDecorsOpen} setIsOpen={setIsDecorsOpen} />
                    </div>
                )
            }
        </>

    );
}

export default GaleryPhotoProduct;