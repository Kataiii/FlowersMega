import { useNavigate } from "react-router-dom"
import ButtonIcon from "../../../shared/ui/buttonIcon/ButtonIcon"
import { CART_PATH } from "../../../shared/utils/constants";
import { useAppSelector } from "../../../store/store";
import { selectTotalCount } from "../redux/selectors";
import { ReactComponent as CartIcon } from '../../../shared/assets/cart.svg';

export const CartButton: React.FC = () => {

    const navigate = useNavigate();

    const cartTotalCount = useAppSelector(selectTotalCount);

    const onCartClick = () => {
        navigate(CART_PATH);
    }

    return <ButtonIcon
        icon={<CartIcon fill="#FF749F" />}
        activeIcon={<CartIcon fill="#fff" />}
        count={cartTotalCount}
        typeEqual={CART_PATH}
        clickHandler={onCartClick} />
}