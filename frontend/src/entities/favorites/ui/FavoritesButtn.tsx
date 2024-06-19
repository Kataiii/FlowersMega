import { useNavigate } from "react-router-dom"
import ButtonIcon from "../../../shared/ui/buttonIcon/ButtonIcon"
import { CART_PATH, FAVOURITES_PATH } from "../../../shared/utils/constants";
import { useAppSelector } from "../../../store/store";
import { ReactComponent as LikeIcon } from '../../../shared/assets/like.svg';
import { favoritesSelectors } from "../redux/selectors";

export const FavoriteButton: React.FC = () => {

    const navigate = useNavigate();

    const favoritesTotal = useAppSelector(favoritesSelectors.selectTotal);

    const onCartClick = () => {
        navigate(FAVOURITES_PATH);
    }

    return <ButtonIcon
        icon={<LikeIcon fill="#FF749F" />}
        activeIcon={<LikeIcon fill="#fff" />}
        count={favoritesTotal}
        typeEqual={FAVOURITES_PATH}
        clickHandler={onCartClick} />
}