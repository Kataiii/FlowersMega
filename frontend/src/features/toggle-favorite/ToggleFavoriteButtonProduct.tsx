import { HeartOutlined } from "@ant-design/icons";
import { isFavoriteSelector } from "../../entities/favorites/redux/selectors";
import { addFavorite, deleteFavorite } from "../../entities/favorites/redux/slice";
import { FullProductSizeDto, ProductCatalogCard, ProductSize, Size } from "../../store/product";
import { useAppDispatch, useAppSelector } from "../../store/store";

type ToggleFavoritesButtonProps = {
    item: ProductCatalogCard;
};

export const ToggleFavoritesButtonProduct: React.FC<ToggleFavoritesButtonProps> = ({ item }) => {
    const dispatch = useAppDispatch();

    const isFavorite = useAppSelector((state) =>
        isFavoriteSelector(state, { id: item.id ?? 0 })
    );

    const toggleFavorite = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('TOGGLE', isFavorite);

        if (isFavorite) {
            dispatch(deleteFavorite({ id: item.id ?? 0 }));
        } else {
            dispatch(addFavorite(item));
        }
    };

    return (
        <HeartOutlined
            onClick={toggleFavorite}
            style={{
                fontSize: 20,
                color: isFavorite ? '#FF749F' : '#1A2030',
            }}
        />
    );
};