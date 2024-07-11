import { Button, Image } from "antd";
import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Container from "../../../shared/ui/containerMain/ContainerMain";
import { Text } from "../../../shared/ui/forAdditionalPages/Content";
import Error from "../../../shared/assets/no-image.png";
import { ReactComponent as Profile } from "../../../shared/assets/profile.svg";
import { ReactComponent as Cart } from "../../../shared/assets/cart.svg";
import { ReactComponent as Exit } from "../../../shared/assets/exit.svg";
import ButtonWithIcon, { ButtonWithIconProps } from "../../../shared/ui/button/ButtonWithIcon";
import { ORDERS_PATH, PROFILE_PATH } from "../../../shared/utils/constants";

const ProfileMain: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const buttonItems = useMemo(() => [
        {
            content: "Профиль",
            icon: <Profile fill="#6bc778" />,
            activeIcon:  <Profile fill="#FFFFFF" />, 
            onCLick: () => navigate(PROFILE_PATH),
            link: PROFILE_PATH
        },
        {
            content: "Заказы",
            icon: <Cart fill="#6bc778" />,
            activeIcon:  <Cart fill="#FFFFFF" />, 
            onCLick: () => navigate(ORDERS_PATH),
            link: ORDERS_PATH
        },
        {
            content: "Выход",
            icon: <Exit fill="#FFFFFF" />,
            onCLick: () => console.log('Выход'),
        }
    ], [])

    return (
        <Container style={{ margin: "0 auto", flexGrow: 3, paddingBottom: 20}}>
            <div style={{backgroundColor: "var(--block-bg-color)", borderRadius: 6, display: "flex"}}>
                <div style={{
                    borderRight: "1px solid var(--main-bg-color)", 
                    width: "20%", 
                    padding: "35px", 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: 30 
                }}>
                    <div style={{
                        display: "flex", 
                        justifyContent: "start", 
                        gap: 20, 
                        alignItems: "center"
                    }}>
                        <Image 
                            width={64}
                            height={64}
                            style={{borderRadius: 32}}
                            fallback={Error}/>
                        <Text>ФИО</Text>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16
                    }}>
                        {
                            buttonItems.map((item, index) => {
                                return <ButtonWithIcon 
                                            key={index}
                                            content={item.content} 
                                            icon={item.icon} 
                                            onCLick={item.onCLick} 
                                            isActive={location.pathname === item.link}/>
                            })
                        }
                    </div>
                </div>
                <Outlet></Outlet>
            </div>
        </Container>
    )
}

export default ProfileMain;