import { styled } from "styled-components";
import { cartSelectors } from "../../entities/cart/redux/selectors";
import { addOneToCart, deleteOneFromCart } from "../../entities/cart/redux/slice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import Minus from "../../shared/assets/minus.svg";
import Plus from "../../shared/assets/plus.svg";

type ProductPageCountControllerProps = {
    id: string | number
}

const ContainerButtons = styled.div`
    border: 1px solid var(--primary-bg-color);
    border-radius: 4px;
    display: flex;
`;

const Button = styled.button`
    padding: 10px;
    background-color: var(--primary-bg-color);
    border: none;
    color: var(--primary-text-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ProductPageCountController: React.FC<ProductPageCountControllerProps> = ({id}) => {
    const cartProduct = useAppSelector(state => cartSelectors.selectById(state, +id));
    const dispatch = useAppDispatch();

    const increment = () => {
        dispatch(addOneToCart(cartProduct));
    }

    const decrement = () => {
        dispatch(deleteOneFromCart(cartProduct));
    }

    return(
        <ContainerButtons>
            <Button onClick={decrement}><img src={Minus} alt="minus"/></Button>
            <div style={{padding: "8px 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <input style={{width: "40px", textAlign: "center", outline: "none", border: "none",fontFamily: "Inter", fontSize: 20, fontWeight: 400, color: "var(--secondary-text-color)"}} value={cartProduct.count}/>
            </div>
            <Button onClick={increment}><img src={Plus} alt="plus"/></Button>
        </ContainerButtons>
    )
}

export default ProductPageCountController;