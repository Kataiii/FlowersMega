import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ButtonText } from "../../pages/admin/ui/products/Products";
import Postcard from "./Postcard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostcard, removePostcard, updatePostcard, updatePostcardId } from "../../entities/postcard/redux/slice";
import { postcardsSelectors } from "../../entities/postcard/redux/selectors";
import { addOneToCart, deleteOneFromCart } from "../../entities/cart/redux/slice";
import { nanoid } from "@reduxjs/toolkit";
import { ProductSize, useProductsControllerGetByIdQuery } from "../../store/product";
import { CartProduct } from "../../entities/cart/types";

interface PostcardAddBlockProps {
    product: Omit<CartProduct, 'count'>,
    style?: React.CSSProperties,
    showHeader?: boolean,
}

import { useEffect } from "react";

const PostcardAddBlock: React.FC<PostcardAddBlockProps> = ({ product, style, showHeader }) => {
    const dispatch = useDispatch();
    const postcards = useSelector(postcardsSelectors.selectAll);
    const { isLoading, data } = useProductsControllerGetByIdQuery({ id: product.idProduct });

    const handleAddPostcard = () => {
        const text = "";
        dispatch(addPostcard({ text }));
        dispatch(addOneToCart(product));
    };

    const handleUpdatePostcard = (id: string, updatedText: string) => {
        dispatch(updatePostcard({ id, text: updatedText }));
    };

    const handleRemovePostcard = (id: string) => {
        dispatch(removePostcard({ id }));
        dispatch(deleteOneFromCart(product));
    };

    useEffect(() => {

        postcards.forEach((postcard) => {
            const newId = `${postcard.id}-productSize-${product.id}`;
            if (postcard.updatedId !== newId) {
                dispatch(updatePostcardId({ oldId: postcard.id, newId }));
            }
        });
    }, [product.id, postcards, dispatch]);

    return (
        <div
            style={{
                border: "2px solid var(--primary-bg-color)",
                width: "100%",
                height: "fit-content",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                padding: "8px",
                gap: "8px",
                ...style,
            }}
        >
            {showHeader && <p
                style={{
                    fontFamily: "Inter",
                    fontSize: "16px",
                    fontWeight: 600,
                    height: "5%",
                    color: "var(--primary-review-text)",
                    padding: "8px",
                }}
            >
                Добавление в корзину
            </p>}
            <div
                style={{
                    paddingTop: "8px",
                    maxHeight: "90%",
                    height: "100%",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    scrollbarColor: "var(--primary-bg-color) var(--main-bg-color)",
                    scrollbarWidth: "thin",
                }}
            >
                {postcards.map((postcard, index) => (
                    <Postcard
                        key={postcard.updatedId || postcard.id}
                        value={{ postcard, pos: index }}
                        onChange={(updatedText) => handleUpdatePostcard(postcard.id, updatedText)}
                        onRemove={() => handleRemovePostcard(postcard.id)}
                    />
                ))}
            </div>
            <Button
                type="dashed"
                color="primary"
                style={{ width: "100%", height: "35px" }}
                onClick={handleAddPostcard}
            >
                <ButtonText style={{ display: "inline" }}>Добавить открытку</ButtonText> <PlusOutlined />
            </Button>
        </div>
    );
};

export default PostcardAddBlock;