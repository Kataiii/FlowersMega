import { styled } from "styled-components";
import Button from "../button/Button";
import {ReactComponent as Logo} from "../../assets/logo.svg";
import "../../utils/cssConstants.css";
import { Link as LinkRRD, useLocation, useNavigate } from "react-router-dom";
import { ABOUT_PATH, CONTACTS_PATH, HELP_PATH, HOME_PATH, ORDER_CALL_PATH, PAYMENT_DELIVERY_PATH, targetA } from "../../utils/constants";
import { useMemo } from "react";
import Link, { LinkProps } from "../link/Link";

const Container = styled.div`
    background-color: var(--block-bg-color);
    padding: 24px 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ContainerLinks = styled(Container)`
    width: 55%;
    justify-content: flex-end;
    gap: 45px;
    padding: 0 20px;
`;

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const links = useMemo<LinkProps[]>(() => [
        {
            content: "Доставка и оплата",
            href: PAYMENT_DELIVERY_PATH,
            target: targetA._self
        },
        {
            content: "О нас",
            href: ABOUT_PATH,
            target: targetA._self
        },
        {
            content: "Контакты",
            href: CONTACTS_PATH,
            target: targetA._self
        },
        {
            content: "Помощь",
            href: HELP_PATH,
            target: targetA._self
        },
    ], []);

    return (
        <Container>
            <Logo style={{cursor: "pointer"}} alt="logo" onClick={() => navigate(HOME_PATH)} />
            <ContainerLinks>
                <>
                    {
                        links.map((item, index) => {
                            return <Link key={index} content={item.content} href={item.href} target={item.target} />
                        })
                    }
                </>
            </ContainerLinks>
            <div style={{width: 'fit-content'}}>
                <LinkRRD to={ORDER_CALL_PATH} state={{ previousLocation: location }}>
                    <Button buttonContent="Заказать звонок" clickHandler={() => {}} />
                </LinkRRD>
            </div>
        </Container>
    )
}

export default Header;