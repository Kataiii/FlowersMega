import React, { useState } from "react";
import styled from "styled-components";

import { ReactComponent as Cursor } from "../../../../shared/assets/cursor.svg";
import { useNavigate } from "react-router-dom";
import { Image, Rate } from "antd";
import { Numerals } from "../../../../shared/utils/numerals";
import { ProductCatalogCard, ProductSize } from "../../../../store/product";
import { API_URL, CART_PATH, PRODUCT_PATH } from "../../../../shared/utils/constants";
import { ButtonText } from "../../../../pages/admin/ui/products/Products";
import { ReactComponent as AddCart } from '../../../../shared/assets/add_cart.svg'
import ModalEmpty from "../../../../shared/ui/modalEmpty/ModalEmpty";
import { CartProduct } from "../../../cart/types";
import { addOneToCart } from "../../../cart/redux/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { isInCartSelector } from "../../../cart/redux/selectors";
import { useDispatch } from "react-redux";

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
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const mapProductSizeToCartProduct = (
        product: ProductCatalogCard,
        productSize: ProductSize
    ): Omit<CartProduct, 'count'> => ({
        ...productSize,
        product: {
            id: product.id!,
            name: product.name,
            description: product.description,
            structure: product.structure!,
            idTypeProduct: product.idTypeProduct,
            image: product.image,
        },
    });


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
                        }}
                    >
                        {product.name}
                    </p>
                    {product.productSizes.some(
                        size => size.productSize.paramsSize && size.productSize.paramsSize.trim() !== ''
                    ) ? (
                        <p
                            style={{
                                fontFamily: "Inter",
                                fontWeight: 400,
                                fontSize: "14px",
                                color: "#8B8B8B",
                                margin: 0,
                                wordBreak: "break-word",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {product.productSizes.length === 1
                                ? `Размер: ${product.productSizes[0]?.productSize.paramsSize}`
                                : `Размер: от ${product.productSizes[0]?.productSize.paramsSize} - ${product.productSizes[product.productSizes.length - 1]?.productSize.paramsSize}`}
                        </p>
                    ) : (
                        <p
                            style={{
                                fontFamily: "Inter",
                                fontWeight: 400,
                                fontSize: "14px",
                                color: "#8B8B8B",
                                margin: 0,
                                height: "17px",
                            }}
                        >
                            &nbsp;
                        </p>
                    )}
                </div>
                {product.productSizes.length > 0 && (
                    <p
                        style={{
                            fontFamily: "Inter",
                            fontWeight: 600,
                            fontSize: "16px",
                            color: "var(--secondary-text-color)",
                            margin: 0,
                        }}
                    >
                        {product.productSizes.length === 1
                            ? `Цена: ${product.productSizes[0]?.productSize.extraPrice} ₽`
                            : `Цена: от ${product.productSizes[0]?.productSize.extraPrice} ₽`}
                    </p>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <ButtonStyle style={{ display: "flex", flexDirection: 'row', gap: "2px" }} onClick={() => setIsOpen(prev => !prev)}><AddCart alt="add cart" />
                        <ButtonText>Добавить</ButtonText></ButtonStyle>
                    <ButtonColor onClick={() => setIsOpen(true)}>
                        <Cursor alt="cursor" />
                        В 1 клик
                    </ButtonColor>
                </div>
            </div>
            <div style={{ position: "absolute", top: 15, right: 15 }}>{addToFavorites}</div>
            <ModalEmpty isOpen={isOpen} setIsOpen={setIsOpen} children={
                <div>
                    <p style={{ width: "40%", textAlign: "start", fontSize: "24px", fontFamily: "Inter", fontWeight: "600", marginBottom: "32px" }}>Выберите размер</p>
                    {
                        product.productSizes.map((productSize, index) => {
                            const isHovered = hoveredIndex === index;
                            return (

                                <div style={{
                                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '8px', border: "1px solid var(--primary-bg-color)", marginBottom: "8px", borderRadius: "4px", alignItems: 'center', backgroundColor: isHovered ? "var(--main-bg-color)" : "transparent", cursor: "pointer", transition: "background-color 0.3s ease",
                                }}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={() => {
                                        const cartProduct = mapProductSizeToCartProduct(
                                            product,
                                            productSize.productSize
                                        );
                                        dispatch(addOneToCart(cartProduct));
                                    }}
                                    key={index}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: "4px" }}>
                                        <p style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: '16px' }}>{productSize.size.name}</p>
                                        <p style={{ fontFamily: 'Inter', fontWeight: '400', fontSize: '12px', color: "var(--text-modal)" }}>Параметры размера: {productSize.productSize.paramsSize}</p>
                                    </div>
                                    <p style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '16px' }}>{productSize.productSize.extraPrice} ₽</p>
                                </div>
                            )

                        })
                    }
                </div>
            } />

        </div>
    );
};

export default CardProductCatalog;
