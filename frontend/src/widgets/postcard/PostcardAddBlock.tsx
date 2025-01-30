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
import { useEffect } from "react";
interface PostcardAddBlockProps {
    product: Omit<CartProduct, 'count'>,
    style?: React.CSSProperties,
    showHeader?: boolean,
}

const PostcardAddBlock: React.FC<PostcardAddBlockProps> = ({ product, style, showHeader }) => {
    const dispatch = useDispatch();
    const postcards = useSelector(postcardsSelectors.selectAll);
    const { isLoading, data } = useProductsControllerGetByIdQuery({ id: product.idProduct });

    const handleAddPostcard = () => {
        if (product.id === undefined)
            return new Error("product.id is undefined");
        dispatch(addPostcard({
            text: "",
            productId: product.product.id.toString()
        }));
        dispatch(addOneToCart(product));
    };

    const handleRemovePostcard = (id: string) => {
        dispatch(removePostcard({ id }));
        dispatch(deleteOneFromCart(product));
    };

    const currentPostcards = postcards.filter(postcard =>
        postcard.updatedId.endsWith(`-productSize-${product.product.id}`)
    );
    console.log(currentPostcards, "currentPostcards");
    console.log(postcards, "postcards");
    // console.log(product, "postcards")
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
                {currentPostcards.map((postcard, index) => (
                    <Postcard
                        key={postcard.updatedId}
                        value={{ postcard, pos: index }}
                        onChange={(text) => dispatch(updatePostcard({ id: postcard.id, text }))}
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