import { HeartOutlined } from "@ant-design/icons";
import { isFavoriteSelector } from "../../entities/favorites/redux/selectors";
import { deleteFavorite, addFavorite } from "../../entities/favorites/redux/slice";
import { FullProductSizeDto, ProductSize } from "../../store/product";
import { useAppDispatch, useAppSelector } from "../../store/store";


type AddToFavoritesButtonProps = {
    item: ProductSize
}

export const ToggleFavoritesButton: React.FC<AddToFavoritesButtonProps> = ({ item }) => {

    const dispatch = useAppDispatch();

    const isFavorite = useAppSelector(state => isFavoriteSelector(state, item))

    const toggleFavorite = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        if (isFavorite) dispatch(deleteFavorite(item));
        else dispatch(addFavorite(item));
    }

    return (
        <HeartOutlined
            onClick={toggleFavorite}
            style={{
                fontSize: 20,
                color: isFavorite ? '#FF749F' : '#1A2030'
            }} />
    );
}