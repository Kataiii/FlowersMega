import { useEffect, useMemo } from "react";
import {ReactComponent as ProfileIcon} from "../../assets/profile.svg";
import {ReactComponent as LikeIcon} from "../../assets/like.svg";
import {ReactComponent as CartIcon} from "../../assets/cart.svg";
import ButtonIcon, { ButtonIconProps } from "../buttonIcon/ButtonIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { CART_PATH, FAVOURITES_PATH, PROFILE_PATH } from "../../utils/constants";
import { styled } from "styled-components";

const Container = styled.div`
    width: 90%;
    background-color: var(--block-bg-color);
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    border-radius: 6px;
`;

const SecondHeader: React.FC = () => {
    const navigate = useNavigate();

    const iconButtons = useMemo<ButtonIconProps[]>(() => [
        {
            icon: <LikeIcon fill="#FF749F"/>,
            activeIcon: <LikeIcon fill="#fff"/>,
            typeEqual: FAVOURITES_PATH,
            clickHandler: () => navigate(FAVOURITES_PATH)
        },
        {
            icon: <CartIcon fill="#FF749F"/>,
            activeIcon: <CartIcon fill="#fff"/>,
            typeEqual: CART_PATH,
            clickHandler: () => navigate(CART_PATH)
        },
        {
            icon: <ProfileIcon fill="#FF749F"/>,
            activeIcon: <ProfileIcon fill="#FFF"/>,
            typeEqual: PROFILE_PATH,
            clickHandler: () => navigate(PROFILE_PATH)
        }
    ], []);

    return(
        <Container>
            <>
            {
                iconButtons.map((item, index) => {
                    return <ButtonIcon key={index} typeEqual={item.typeEqual} icon={item.icon} activeIcon={item.activeIcon} clickHandler={item.clickHandler}/>
                })
            }
            </> 
        </Container>
    )
}

export default SecondHeader;