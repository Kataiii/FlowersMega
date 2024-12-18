import { styled } from "styled-components";
import Container from "../../../../shared/ui/containerMain/ContainerMain"
import { Title } from "../../../../shared/ui/forAdditionalPages/Title";
import { EMAIL, PHONE } from "../../../../shared/utils/constants";
import {ReactComponent as Tg} from "../../../../shared/assets/teleg.svg";
import {ReactComponent as  Viber} from "../../../../shared/assets/viber.svg";
import Whatsapp from "../../../../shared/assets/whatsapp.png";
import { Text } from "../../../../shared/ui/forAdditionalPages/Content";

const ContainerContacts = styled.div`
    width: 100%;
    background-color: var(--block-bg-color);
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 40px;
`;

const TitleContacts = styled.h5`
    font-family: "Inter";
    font-weight: 600;
    font-size: 20px;
    color: var(--primary-bg-color);
`;

const ContextContacts = styled.p`
    font-family: "Inter";
    font-weight: 400;
    font-size: 24px;
    color: var(--secondary-text-color);
`;

const Contacts: React.FC = () => {
    return(
        <Container style={{margin: "0 auto", flexGrow: 3, padding: "35px 0"}}>
            <Title>Контакты</Title>
            <ContainerContacts>
                <div style={{display: "flex", gap: 40}}>
                    <div style={{display: "flex", flexDirection: "column", gap: 16}}>
                        <TitleContacts>Телефон</TitleContacts>
                        <a style={{textDecoration: "none"}} href="tel:+79869869996"><ContextContacts>{PHONE}</ContextContacts></a>
                    </div>

                    <div style={{display: "flex", flexDirection: "column", gap: 16}}>
                        <TitleContacts>E-mail</TitleContacts>
                        <a style={{textDecoration: "none"}} href="mailto:info.luckyflora@mail.ru"><ContextContacts>{EMAIL}</ContextContacts></a>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", gap: 16}}>
                        <TitleContacts>Наши соцсети</TitleContacts>
                        <div style={{display: "flex", gap: 24}}>
                            <a style={{textDecoration: "none"}} href="https://telegram.me/luckyfll" target="_blank">
                                <div style={{display: "flex", gap: 10, alignItems: "center", cursor: "pointer"}}>
                                    <Tg/>
                                    <Text>Telegram</Text>
                                </div>
                            </a>
                            <a style={{textDecoration: "none"}} title="Viber" href="viber://chat?number=79869869996">
                                <div style={{display: "flex", gap: 10, alignItems: "center", cursor: "pointer"}}>
                                    <Viber/>
                                    <Text>Viber</Text>
                                </div>
                            </a>
                            <a style={{textDecoration: "none"}} href="whatsapp://send?phone=79869869996">
                                <div style={{display: "flex", gap: 10, alignItems: "center", cursor: "pointer"}}> 
                                    <img style={{width: 30, height: 30}} src={Whatsapp}/>
                                    <Text>WhatsApp</Text>
                                </div>
                            </a>
                        </div>
                    </div>
            </ContainerContacts>
        </Container>
    )
}

export default Contacts;