import { HeartOutlined } from "@ant-design/icons";
import { isFavoriteSelector } from "../../entities/favorites/redux/selectors";
import { deleteFavorite, addFavorite } from "../../entities/favorites/redux/slice";
import { FullProductSizeDto, Product, ProductSize } from "../../store/product";
import { useAppDispatch, useAppSelector } from "../../store/store";


type AddToFavoritesButtonProps = {
    item: FullProductSizeDto
}

export const ToggleFavoritesButton: React.FC<AddToFavoritesButtonProps> = ({ item }) => {

    const dispatch = useAppDispatch();

    const isFavorite = useAppSelector(state => isFavoriteSelector(state, item.productSize))

    const toggleFavorite = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('TOGGLE', isFavorite);
        
        if (isFavorite) dispatch(deleteFavorite(item.productSize));
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