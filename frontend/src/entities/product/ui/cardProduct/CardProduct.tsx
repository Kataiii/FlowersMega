import React, { useEffect } from "react";
import { styled } from "styled-components";
import { API_URL, PRODUCT_PATH } from "../../../../shared/utils/constants";
import { Product, ProductSize, useProductsControllerGetByIdQuery } from "../../../../store/product";
import { Size, useSizesControllerGetByIdQuery } from "../../../../store/size";
import AddCart from "../../../../shared/assets/add_cart.svg";
import Cursor from "../../../../shared/assets/cursor.svg";
import { useNavigate } from "react-router-dom";

type CardProductProps = {
    product: Product & { productSize: ProductSize, size?: Size };
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

    return (
        <div style={{ width: '286px', borderRadius: "14px", padding: "8px", backgroundColor: "var(--block-bg-color)", display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}>

            {/* @ts-ignore */}
            <img style={{ width: "270px", height: "270px", borderRadius: "6px", cursor: "pointer"}} src={`${API_URL}/products/images/${product?.id}/${product?.images[0].url}`} onClick={() => navigate(`${PRODUCT_PATH}/${product.name}/${product.size?.name}`)} alt={product?.name} />
            <div>
                {/* <p>Отзывы</p> */}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <p style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: "16px", color: "var(--secondary-text-color)", margin: 0 }}>{product.name} {`(${product.size?.name})`}</p>
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