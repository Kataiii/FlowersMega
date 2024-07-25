import React, { useEffect } from "react";
import { styled } from "styled-components";
import { API_URL, PRODUCT_PATH } from "../../../../shared/utils/constants";
import { FullProductSizeDto, Product, ProductSize, useProductsControllerGetByIdQuery } from "../../../../store/product";
import { Size, useSizesControllerGetByIdQuery } from "../../../../store/size";
import AddCart from "../../../../shared/assets/add_cart.svg";
import Cursor from "../../../../shared/assets/cursor.svg";
import { useNavigate } from "react-router-dom";
import { Rate } from "antd";

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

    console.log(product);

    return (
        <div style={{ width: '286px', borderRadius: "14px", padding: "8px", backgroundColor: "var(--block-bg-color)", display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}> 
        {/* @ts-ignore            */}
            <img style={{ width: "270px", height: "270px", borderRadius: "6px", cursor: "pointer"}} src={`${API_URL}/products/images/${product?.productSize.idProduct}/${product?.product.image.url}`} onClick={() => navigate(`${PRODUCT_PATH}/${product.product.name}/${product.size?.name}`, { state: {idProduct: product.productSize.idProduct, idSize: product.productSize.idSize} })} alt={product.product.name} />
            <div style={{display: "flex", gap: 10, alignItems: "center"}}>
                <Rate style={{ color: "var(--primary-bg-color)" }} value={product.reviewsInfo?.averageRating ?? 0} disabled/>
                <p style={{fontFamily: "Inter", display: "inline", fontSize: 14, fontWeight: 600, color: "var(--text-modal)"}}>{product.reviewsInfo?.count === 0 ? "нет отзывов" : `${product.reviewsInfo?.count} отзывов`}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <p style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: "16px", color: "var(--secondary-text-color)", margin: 0 }}>{product.product.name} {`(${product.size?.name})`}</p>
                    <p style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: "14px", color: "#8B8B8B", margin: 0 }}>Размер: {product.productSize.paramsSize}</p>
                </div>
                <p style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: "24px", color: "var(--secondary-text-color)", margin: 0 }}>{product.productSize.prise.toLocaleString()} ₽</p>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    {addToCartButton}
                    <ButtonColor>
                        <img src={Cursor} alt="cursor" />
                        В 1 клик
                    </ButtonColor>
                </div>
            </div>
            <div style={{position: "absolute", top: 15, right: 15}}>
                {addToFavorites}
            </div>
        </div>
    )
}

export default CardProduct;