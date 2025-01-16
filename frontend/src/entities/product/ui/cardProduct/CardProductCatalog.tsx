import React, { useState } from "react";
import styled from "styled-components";

import { ReactComponent as Cursor } from "../../../../shared/assets/cursor.svg";
import { useNavigate } from "react-router-dom";
import { Image, Rate } from "antd";
import { Numerals } from "../../../../shared/utils/numerals";
import { ProductCatalogCard } from "../../../../store/product";
import { API_URL, PRODUCT_PATH } from "../../../../shared/utils/constants";

type CardProductProps = {
    product: ProductCatalogCard;
    addToCartButton?: React.ReactElement;
    addToFavorites?: React.ReactElement;
};

const ButtonStyle = styled.button`
    background-color: var(--primary-bg-color);
    width: 100%;
    color: var(--primary-text-color);
    font-family: "Inter";
    font-weight: 400;
    font-size: 16px;
    padding: 12px;
    border-radius: 6px;
    border: none;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: var(--primary-bg-color-hover);
    }
`;

const ButtonColor = styled.button`
    background-color: var(--secondary-bg-color);
    width: 100%;
    color: var(--primary-text-color);
    font-family: "Inter";
    font-weight: 400;
    font-size: 16px;
    padding: 12px;
    border-radius: 6px;
    border: none;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: var(--secondary-bg-color-hover);
    }
`;

const CardProductCatalog: React.FC<CardProductProps> = ({ product, addToCartButton, addToFavorites }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    console.log(product.reviewInfo?.count, 'LALALALALALLALALAL')
    return (
        <div
            style={{
                width: "100%",
                borderRadius: "14px",
                padding: "8px",
                backgroundColor: "var(--block-bg-color)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                position: "relative",
                justifyContent: "space-between",
            }}
        >
            <Image preview={{ visible: false }} style={{ width: "100%", height: "270px", borderRadius: "6px", cursor: "pointer", objectFit: "contain", }} src={`${API_URL}/products/images/${product.id}/${product.image.url}`}
                onClick={() => navigate(`${PRODUCT_PATH}/${product.name}/${product.productSizes[0].size.name}`, { state: { idProduct: product.id, idSize: product.productSizes[0].size.id } })}
                alt={product.name}
            />
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Rate
                    style={{ color: "var(--primary-bg-color)" }}
                    value={product.reviewInfo?.averageRating ?? 0}
                    disabled
                />
                <p
                    style={{
                        fontFamily: "Inter",
                        display: "inline",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--text-modal)",
                    }}
                >
                    {product.reviewInfo?.count === 0
                        ? "нет отзывов"
                        : `${product?.reviewInfo?.count} ${Numerals.numeralsReviews(
                            (product?.reviewInfo?.count ?? -1) % 10
                        )}`}
                </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <p
                        style={{
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontSize: "16px",
                            color: "var(--secondary-text-color)",
                            margin: 0,
                            wordBreak: "break-word",
                        }}
                    >
                        {product.name}
                    </p>
                    {product.productSizes.length > 0 && (
                        <p
                            style={{
                                fontFamily: "Inter",
                                fontWeight: 400,
                                fontSize: "14px",
                                color: "#8B8B8B",
                                margin: 0,
                            }}
                        >
                            Размер: {product.productSizes[0]?.size.name} {" - "}
                            {product.productSizes[product.productSizes.length - 1]?.size.name}
                        </p>
                    )}
                </div>
                {product.productSizes.length > 0 && (
                    <p
                        style={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontSize: "14px",
                            color: "#8B8B8B",
                            margin: 0,
                        }}
                    >
                        Цена: от {product.productSizes[0]?.productSize.prise} до{" "}
                        {product.productSizes[product.productSizes.length - 1]?.productSize.prise}
                    </p>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    {addToCartButton}
                    <ButtonColor onClick={() => setIsOpen(true)}>
                        <Cursor alt="cursor" />
                        В 1 клик
                    </ButtonColor>
                </div>
            </div>
            <div style={{ position: "absolute", top: 15, right: 15 }}>{addToFavorites}</div>
        </div>
    );
};

export default CardProductCatalog;
