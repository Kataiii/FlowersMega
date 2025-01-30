import { ABOUT_PATH, CATALOG_PATH, CONTACTS_PATH, EMAIL, HELP_PATH, HOME_PATH, PAYMENT_DELIVERY_PATH, PHONE, POLITICS_PATH, targetA } from "../../utils/constants";
import Container from "../containerMain/ContainerMain";
import Link from "../link/Link";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ReactComponent as Phone } from "../../assets/phone_footer.svg";
import { ReactComponent as Mail } from "../../assets/mail_footer.svg";
import { useFiltersControllerGetAllQuery } from "../../../store/filter";
import { useDispatch } from "react-redux";
import { addAllToFilters } from "../../../entities/filter/redux/slice";
import { ItemFilter } from "../../../store/product";

const Footer: React.FC = () => {
    const navigate = useNavigate();
    const { isLoading, data } = useFiltersControllerGetAllQuery();
    const dispatch = useDispatch();

    const handleSelectAll = (filterItems: ItemFilter[]) => {
        dispatch(addAllToFilters(filterItems));

        const searchParams = createSearchParams(
            filterItems.reduce((acc: Record<string, string>, item: ItemFilter) => {
                if (item.id) acc[`itemId_${item.id}`] = item.id.toString();
                return acc;
            }, {})
        ).toString();

        navigate({
            pathname: `${CATALOG_PATH}`,
            // search: searchParams,
        });
    };


    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div itemScope itemType="http://schema.org/Organization" style={{ backgroundColor: "var(--block-bg-color)", padding: "24px 0 40px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Container>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <Logo style={{ cursor: "pointer", width: "278px" }} alt="logo" onClick={() => navigate(HOME_PATH)} />
                            <h4 style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "16px", color: "var(--secondary-text-color)", margin: 0 }}>Наши контакты</h4>
                            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                <Phone alt="phone" />
                                <p itemProp="telephone" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "16px", color: "var(--secondary-text-color)", margin: 0 }}>{PHONE}</p>
                            </div>
                            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                <Mail alt="mail" />
                                <p itemProp="email" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "16px", color: "var(--secondary-text-color)", margin: 0 }}>{EMAIL}</p>
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <h4 style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "16px", color: "var(--secondary-text-color)", margin: 0 }}>Компания</h4>
                            <p style={{ cursor: "pointer", fontFamily: "Inter", fontWeight: 400, fontSize: "16px", color: "var(--unactive-text-color)", margin: 0 }} onClick={() => navigate(ABOUT_PATH)}>О нас</p>
                            <p style={{ cursor: "pointer", fontFamily: "Inter", fontWeight: 400, fontSize: "16px", color: "var(--unactive-text-color)", margin: 0 }} onClick={() => navigate(PAYMENT_DELIVERY_PATH)}>Доставка</p>
                            <p style={{ cursor: "pointer", fontFamily: "Inter", fontWeight: 400, fontSize: "16px", color: "var(--unactive-text-color)", margin: 0 }} onClick={() => navigate(PAYMENT_DELIVERY_PATH)}>Оплата</p>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <h4 style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "16px", color: "var(--secondary-text-color)", margin: 0 }}>Каталог</h4>
                            {data && data.map((filter, index) => (
                                <p key={index} style={{ cursor: "pointer", fontFamily: "Inter", fontWeight: 400, fontSize: "16px", color: "var(--unactive-text-color)", margin: 0 }} onClick={() => { navigate(CATALOG_PATH); handleSelectAll(filter?.items || []) }}>{filter?.name}</p>
                            ))}
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <h4 style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "16px", color: "var(--secondary-text-color)", margin: 0 }}>Клиентам</h4>
                            <p style={{ cursor: "pointer", fontFamily: "Inter", fontWeight: 400, fontSize: "16px", color: "var(--unactive-text-color)", margin: 0 }} onClick={() => navigate(CONTACTS_PATH)}>Контакты</p>
                            <p style={{ cursor: "pointer", fontFamily: "Inter", fontWeight: 400, fontSize: "16px", color: "var(--unactive-text-color)", margin: 0 }} onClick={() => navigate(HELP_PATH)}>Помощь</p>
                            <p style={{ cursor: "pointer", fontFamily: "Inter", fontWeight: 400, fontSize: "16px", color: "var(--unactive-text-color)", margin: 0 }} onClick={() => navigate(ABOUT_PATH)}>Почему мы?</p>
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <div style={{ display: "flex", gap: "24px", padding: "20px 0" }}>
                    <Link content={"2023 Все права защищены"} href={"#"} target={targetA._self} />
                    <Link content="Политика конфиденциальности" href={POLITICS_PATH} target={targetA._self} />
                </div>
            </Container>
        </div>
    )
}

export default Footer;