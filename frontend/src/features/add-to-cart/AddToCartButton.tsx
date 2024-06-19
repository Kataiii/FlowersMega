import React from "react";
import { isInCartSelector } from "../../entities/cart/redux/selectors";
import { addOneToCart } from "../../entities/cart/redux/slice";
import Button, { ButtonStyle } from "../../shared/ui/button/Button";
import { Product, ProductSize } from "../../store/product";
import { useAppDispatch, useAppSelector } from "../../store/store";
import AddCart from '../../shared/assets/add_cart.svg';

type AddToCartButtonProps = {
    product: ProductSize
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {

    const dispatch = useAppDispatch();
    const isInCart = useAppSelector(state => isInCartSelector(state, product));

    const addToCart = () => dispatch(addOneToCart(product));

    return (
        isInCart
            ? <ButtonStyle>
                Перейти
            </ButtonStyle>
            : <ButtonStyle onClick={addToCart}>
                <img src={AddCart} alt="add cart" />
                Добавить
            </ButtonStyle>
    );
}