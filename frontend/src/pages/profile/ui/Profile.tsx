import { Form, Image, Input } from "antd";
import PhoneInput from "react-phone-input-2";
import { styled } from "styled-components";
import { Title } from "../../../shared/ui/forAdditionalPages/Title";
import Error from "../../../shared/assets/no-image.png";
import { SetStateAction, useState } from "react";
import ModalEmpty from "../../../shared/ui/modalEmpty/ModalEmpty";
import LoadPhoto from "../../../widgets/loadPhoto/LoadPhoto";
import TryPhoto from "../../../widgets/loadPhoto/TryPhoto";
import { errorMessageEmail, regExEmail } from "../../../shared/utils/validationConstants";

const Button = styled.button<{ $primary?: boolean; }>`
    font-family: "Inter";
    font-weight: 400;
    font-size: 16px;
    color: var(--primary-text-color);
    background-color: ${props => props.$primary ? "var(--primary-bg-color)" : "var(--secondary-bg-color)"};
    padding: 12px 16px;
    border-radius: 6px;
    border: none;
    margin: 0;
`;

const ButtonPhoto = styled.h5`
    cursor: pointer;
    font-family: "Inter";
    font-weight: 400;
    font-size: 16px;
    color: var(--primary-bg-color);
`;

const Profile: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [ formDisable, setFormDisable ] = useState<boolean>(true);

    return (
        <div style={{ width: "100%" }}>
            <div style={{ width: "100%", padding: 35, borderBottom: "1px solid #F5EFF5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Title style={{ fontSize: 24 }}>Личные данные</Title>
                <Button>Изменить</Button>
            </div>
            <div style={{ width: "100%", padding: "35px 70px" }}>
                <Form layout="vertical"
                    requiredMark={false}
                    style={{display: "flex", gap: 70}}
                    disabled={formDisable}>
                    
                    <div style={{display: "flex", flexDirection: "column", gap: 20, alignItems: "center", justifyContent: "center"}}>
                        <Image 
                            width={120}
                            height={120}
                            style={{borderRadius: 64}}
                            fallback={Error}/>
                        <ButtonPhoto onClick={() => setIsOpen(true)}>Изменить</ButtonPhoto>
                    </div>
                    
                    <div style={{flexGrow: 1}}>
                        <Form.Item label="Ваше ФИО" name="name" rules={[{ required: true, message: "Введите имя" }]}>
                            <Input placeholder="ФИО..." />
                        </Form.Item>

                        <div style={{ display: "flex", gap: 15 }}>
                            <Form.Item style={{ flexGrow: 1 }} label="Номер телефона" name="phone" rules={[{ required: true, message: "Введите номер телефона" }]}>
                                <PhoneInput
                                    disabled={formDisable}
                                    specialLabel=""
                                    inputStyle={{
                                        fontFamily: "Inter",
                                        width: "100%",
                                        height: 32,
                                        border: "1px solid var(--primary-bg-color)",
                                        borderRadius: 4,
                                        padding: "0 11px",
                                        outline: "none"
                                    }} placeholder="+7(XXX)XXX-XX-XX" onlyCountries={['ru']} />
                            </Form.Item>

                            <Form.Item style={{ marginBottom: 8, flexGrow: 1 }} label="Ваш E-mail" name="emailCustomer" rules={[
                                { required: true, message: "Введите почту" },
                                { pattern: regExEmail, message: errorMessageEmail }
                            ]}>
                                <Input placeholder="mail@mail.ru" />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
            <ModalEmpty isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
                <TryPhoto/>
            </ModalEmpty>
        </div>
    )
}

export default Profile;