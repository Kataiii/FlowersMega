import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { API_URL, PRODUCT_PATH } from "../../../../shared/utils/constants";
import { FullProductSizeDto, Product, ProductSize, useProductsControllerGetByIdQuery } from "../../../../store/product";
import { Size, useSizesControllerGetByIdQuery } from "../../../../store/size";
import AddCart from "../../../../shared/assets/add_cart.svg";
import Cursor from "../../../../shared/assets/cursor.svg";
import { useNavigate } from "react-router-dom";
import { Image, Rate } from "antd";
import { Numerals } from "../../../../shared/utils/numerals";
import ModalEmpty from "../../../../shared/ui/modalEmpty/ModalEmpty";
import FormOrder from "../../../../widgets/formOrder/FormOrder";
import { Title } from "../../../../shared/ui/forAdditionalPages/Title";
import { Text } from "../../../../shared/ui/forAdditionalPages/Content";
import FastFormOrder from "../../../../widgets/fastFormOrder/FastFormOrder";

type CardProductProps = {
    product: FullProductSizeDto,
    addToCartButton?: React.ReactElement,
    addToFavorites?: React.ReactElement
}

const ButtonStyle = styled.button`
    background-color: var(--primary-bg-color);
    width: 100%;
    color: var(--primary-text-color);
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    padding: 12px;
    border-radius: 6px;
    border: none;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;

    &:hover{
        background-color: var(--primary-bg-color-hover);
    }
`

const ButtonColor = styled.button`
    background-color: var(--secondary-bg-color);
    width: 100%;
    color: var(--primary-text-color);
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    padding: 12px;
    border-radius: 6px;
    border: none;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;

    &:hover{
        background-color: var(--secondary-bg-color-hover);
    }
`

const CardProduct: React.FC<CardProductProps> = ({ product, addToCartButton, addToFavorites }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    console.log(product);

    return (
        <div style={{ width: '100%', borderRadius: "14px", padding: "8px", backgroundColor: "var(--block-bg-color)", display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}>
            {/* @ts-ignore*/}
            <Image style={{ width: "100%", height: "270px", borderRadius: "6px", cursor: "pointer" }} src={`${API_URL}/products/images/${product?.productSize.idProduct}/${product?.product.image.url}`} onClick={() => navigate(`${PRODUCT_PATH}/${product.product.name}/${product.size?.name}`, { state: { idProduct: product.productSize.idProduct, idSize: product.productSize.idSize } })} alt={product.product.name} />
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Rate style={{ color: "var(--primary-bg-color)" }} value={product.reviewsInfo?.averageRating ?? 0} disabled />
                <p style={{ fontFamily: "Inter", display: "inline", fontSize: 14, fontWeight: 600, color: "var(--text-modal)" }}>{product.reviewsInfo?.count === 0 ? "нет отзывов" : `${product.reviewsInfo?.count} ${Numerals.numeralsReviews((product.reviewsInfo?.count ?? -1) % 10)}`}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <p style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: "16px", color: "var(--secondary-text-color)", margin: 0, wordBreak: "break-all" }}>{product.product.name} {`(${product.size?.name})`}</p>
                    <p style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: "14px", color: "#8B8B8B", margin: 0 }}>Размер: {product.productSize.paramsSize}</p>
                </div>
                <p style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: "24px", color: "var(--secondary-text-color)", margin: 0 }}>{product.productSize.prise.toLocaleString()} ₽</p>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    {addToCartButton}
                    <ButtonColor onClick={() => setIsOpen(true)}>
                        <img src={Cursor} alt="cursor" />
                        В 1 клик
                    </ButtonColor>
                </div>
            </div>
            <div style={{ position: "absolute", top: 15, right: 15 }}>
                {addToFavorites}
            </div>
            <ModalEmpty isOpen={isOpen} setIsOpen={() => setIsOpen(false)} >
                <>
                    <Title style={{ fontSize: 24, margin: 0 }}>Быстрый заказ</Title>
                    <Text style={{ fontWeight: 400, fontSize: 14, color: "var(--text-modal)", margin: 0 }}>для позиции</Text>
                    <div style={{ margin: "15px 0 0", display: 'flex', gap: 24, alignItems: "center", border: "1px solid var(--primary-bg-color)", width: "100%", borderRadius: 4, padding: 8 }}>
                        {/* @ts-ignore */}
                        <Image width={30} height={30} style={{ borderRadius: 4 }} src={`${API_URL}/products/images/${product?.productSize.idProduct}/${product?.product.image.url}`} />
                        <Title style={{ fontWeight: 700, fontSize: 16, color: "var(--primary-bg-color)" }}>{product.product.name} {`(${product.size.name})`}</Title>
                    </div>
                    <FastFormOrder item={{ ...product.productSize, count: 1, product: { ...product.product, id: product.productSize.idProduct, structure: "" } }} />
                </>
            </ModalEmpty>
        </div>
    )
}

export default CardProduct;