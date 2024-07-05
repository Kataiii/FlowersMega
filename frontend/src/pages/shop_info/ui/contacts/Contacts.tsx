import { styled } from "styled-components";
import Container from "../../../../shared/ui/containerMain/ContainerMain"
import { Title } from "../../../../shared/ui/forAdditionalPages/Title";
import { EMAIL, PHONE } from "../../../../shared/utils/constants";

const ContainerContacts = styled.div`
    width: 100%;
    background-color: var(--block-bg-color);
    padding: 28px;
    display: flex;
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
                <div style={{display: "flex", flexDirection: "column", gap: 16}}>
                    <TitleContacts>Телефон</TitleContacts>
                    <ContextContacts>{PHONE}</ContextContacts>
                </div>

                <div style={{display: "flex", flexDirection: "column", gap: 16}}>
                    <TitleContacts>E-mail</TitleContacts>
                    <ContextContacts>{EMAIL}</ContextContacts>
                </div>
            </ContainerContacts>
        </Container>
    )
}

export default Contacts;