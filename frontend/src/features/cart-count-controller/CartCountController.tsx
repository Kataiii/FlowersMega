import React from "react";
import { cartSelectors } from "../../entities/cart/redux/selectors";
import { addOneToCart, deleteOneFromCart } from "../../entities/cart/redux/slice";
import { useAppDispatch, useAppSelector } from "../../store/store";

type CartCountControllerProps = {
    id: string | number
}

export const CartCountController: React.FC<CartCountControllerProps> = ({id}) => {

    const cartProduct = useAppSelector(state => cartSelectors.selectById(state, +id));
    const dispatch = useAppDispatch();

    const increment = () => {
        dispatch(addOneToCart(cartProduct));
    }

    const decrement = () => {
        dispatch(deleteOneFromCart(cartProduct));
    }

    return (
        <div style={{display: 'flex', alignItems: "center"}}>
            <div style={{display: 'flex', minWidth: 115, flexDirection: 'row', gap: 10, height: 40, justifyContent: "space-between", alignItems: "center", borderRadius: 6, border: "1px solid #8B8B8B66", padding: "0 8px"}}>
                <button style={{
                    backgroundColor: "var(--block-bg-color)", 
                    fontFamily: "Inter", 
                    fontSize: 16, 
                    fontWeight: 400, 
                    color: "var(--secondary-text-color)",
                    border: "none",
                    cursor: "pointer",
                    padding: "0 8px"}} onClick={decrement}>-</button>
                <p style={{fontFamily: "Inter", fontSize: 16, fontWeight: 400, color: "var(--secondary-text-color)"}}>{cartProduct.count}</p>
                <button style={{
                    backgroundColor: "var(--block-bg-color)", 
                    fontFamily: "Inter", 
                    fontSize: 16, 
                    fontWeight: 400, 
                    color: "var(--secondary-text-color)",
                    border: "none",
                    cursor: "pointer",
                    padding: "0 8px"}} onClick={increment}>+</button>
            </div>
        </div>
    )
}