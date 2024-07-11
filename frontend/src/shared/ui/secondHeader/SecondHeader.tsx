import { styled } from "styled-components";
import { Input } from "antd";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import Catalog from "../../../features/catalog/Catalog";
import Location from "../../../features/location/Location";
import { CartButton } from "../../../entities/cart/ui/CartButton";
import { FavoriteButton } from "../../../entities/favorites/ui/FavoritesButtn";
import ProfileButton from "../../../entities/credential/ui/ProfileButton";

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
                        <ProfileButton key={'profile'}/>,
                        <CartButton key={'cart'}/>,
                        <FavoriteButton key={'favourite'}/>
                    ]
                }
            </div>
        </Container>
    )
}

export default SecondHeader;