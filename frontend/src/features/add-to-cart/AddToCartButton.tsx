import React from "react";
import { isInCartSelector } from "../../entities/cart/redux/selectors";
import { addOneToCart } from "../../entities/cart/redux/slice";
import Button, { ButtonStyle } from "../../shared/ui/button/Button";
import { Product, ProductSize } from "../../store/product";
import { useAppDispatch, useAppSelector } from "../../store/store";
import AddCart from '../../shared/assets/add_cart.svg';
import { CartProduct } from "../../entities/cart/types";
import { useNavigate } from "react-router-dom";
import { CART_PATH } from "../../shared/utils/constants";

type AddToCartButtonProps = {
    product: Omit<CartProduct, 'count'>
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isInCart = useAppSelector(state => isInCartSelector(state, product));

    const addToCart = () =>{ 
        dispatch(addOneToCart(product));
    }

    const goToCart = () => {
        navigate(CART_PATH);
    }

    return (
        isInCart
            ? <ButtonStyle onClick={goToCart}>
                Перейти
            </ButtonStyle>
            : <ButtonStyle onClick={addToCart}>
                <img src={AddCart} alt="add cart" />
                Добавить
            </ButtonStyle>
    );
}