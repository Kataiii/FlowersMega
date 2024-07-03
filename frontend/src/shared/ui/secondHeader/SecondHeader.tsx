import { useMemo } from "react";
import { ReactComponent as ProfileIcon } from "../../assets/profile.svg";
import { ReactComponent as LikeIcon } from "../../assets/like.svg";
import { ReactComponent as CartIcon } from "../../assets/cart.svg";
import ButtonIcon, { ButtonIconProps } from "../buttonIcon/ButtonIcon";
import { useNavigate } from "react-router-dom";
import { CART_PATH, FAVOURITES_PATH, PROFILE_PATH } from "../../utils/constants";
import { styled } from "styled-components";
import { Input } from "antd";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import Catalog from "../../../features/catalog/Catalog";
import Location from "../../../features/location/Location";
import { CartButton } from "../../../entities/cart/ui/CartButton";
import { FavoriteButton } from "../../../entities/favorites/ui/FavoritesButtn";

const Container = styled.div`
    width: 90%;
    background-color: var(--block-bg-color);
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    margin: 0 auto;
    border-radius: 6px;
`;

const { Search } = Input;
// TODO Сконструировать в виде, объекта с пропсами 
//Search?: React.Element,
//actions: - React.Element[] это кнопки профиля, корзины и т.д
//location? - React.Eleemtn (Саму кнопку смены локации в features, также можно глобально хранить локацию в entities)
//Catalog?: React.Element - аналогично с Search
const SecondHeader: React.FC = () => {
    const navigate = useNavigate();

    const iconButtons = useMemo<ButtonIconProps[]>(() => [
        // {
        //     icon: <LikeIcon fill="#FF749F" />,
        //     activeIcon: <LikeIcon fill="#fff" />,
        //     typeEqual: FAVOURITES_PATH,
        //     clickHandler: () => navigate(FAVOURITES_PATH),
        //     count: 3
        // },
        // {
        //     icon: <CartIcon fill="#FF749F" />,
        //     activeIcon: <CartIcon fill="#fff" />,
        //     typeEqual: CART_PATH,
        //     clickHandler: () => navigate(CART_PATH)
        // },
        {
            icon: <ProfileIcon fill="#FF749F" />,
            activeIcon: <ProfileIcon fill="#FFF" />,
            typeEqual: PROFILE_PATH,
            clickHandler: () => navigate(PROFILE_PATH)
        }
    ], []);

    return (
        <Container>
            <Catalog />
            <Location/>
            <Search
                prefix={<SearchIcon />}
                placeholder="Поиск"
                allowClear
                enterButton="Найти"
                size="large"
            />

            <div style={{ display: "flex", gap: "20px" }}>
                {
                    [
                        ...iconButtons.map((item, index) => {
                            return <ButtonIcon key={index} typeEqual={item.typeEqual} icon={item.icon} activeIcon={item.activeIcon} clickHandler={item.clickHandler} count={item.count} />
                        }),
                        <CartButton />,
                        <FavoriteButton />
                    ]
                }
            </div>
        </Container>
    )
}

export default SecondHeader;