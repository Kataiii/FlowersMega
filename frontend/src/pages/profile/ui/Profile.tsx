import { Form, Image, Input } from "antd";
import PhoneInput from "react-phone-input-2";
import { styled } from "styled-components";
import { Title } from "../../../shared/ui/forAdditionalPages/Title";
import Error from "../../../shared/assets/no-image.png";
import { useRef, useState } from "react";
import ModalEmpty from "../../../shared/ui/modalEmpty/ModalEmpty";
import LoadPhoto from "../../../widgets/loadPhoto/LoadPhoto";
import TryPhoto from "../../../widgets/loadPhoto/TryPhoto";
import { errorMessageEmail, regExEmail } from "../../../shared/utils/validationConstants";
import Button, { ButtonStyle } from "../../../shared/ui/button/Button";
import SecondaryButton from "../../../shared/ui/button/SecondaryButton";
import { useAppSelector } from "../../../store/store";
import { selectUser } from "../../../entities/credential/redux/selectors";

const ButtonPhoto = styled.h5`
    cursor: pointer;
    font-family: "Inter";
    font-weight: 400;
    font-size: 16px;
    color: var(--primary-bg-color);
`;

const ChangeButtonForm = styled(ButtonStyle)<{ $primary?: boolean; }>`
  background-color: ${props => props.$primary ? "var(--primary-bg-color)" : "var(--secondary-bg-color)"};
  color: var(--primary-text-color);
  cursor: pointer;

  &:hover{
    background-color: ${props => props.$primary ? "var(--primary-bg-color-hover)" : "var(--secondary-bg-color-hover)"};
  }
`;

const Profile: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [ formDisable, setFormDisable ] = useState<boolean>(true);
    const user = useAppSelector(selectUser);
    const [form] = Form.useForm();
    

    const changeFormHandler = () => {
        setFormDisable(prev => !prev);
        form.submit();
    }

    const finishFormHandler = (values: any) => {
        console.log(values);
    }

    return (
        <div style={{ width: "100%" }}>
            <div style={{ width: "100%", padding: 35, borderBottom: "1px solid #F5EFF5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Title style={{ fontSize: 24 }}>Личные данные</Title>
                <div style={{width: 200}}>
                    <ChangeButtonForm $primary={formDisable ? true : false} onClick={changeFormHandler}>{formDisable ? "Изменить" : "Сохранить"}</ChangeButtonForm>
                </div>
            </div>
            <div style={{ width: "100%", padding: "35px 70px" }}>
                <div style={{display: "flex", gap: 70}}>
                    
                    <div style={{display: "flex", flexDirection: "column", gap: 20, alignItems: "center", justifyContent: "center"}}>
                        <Image 
                            width={120}
                            height={120}
                            style={{borderRadius: 64}}
                            fallback={Error}/>
                        <ButtonPhoto onClick={() => setIsOpen(true)}>Изменить</ButtonPhoto>
                    </div>
                    
                    <div style={{flexGrow: 1}}>
                        <Form layout="vertical"
                            form={form}
                            name="control-hooks"
                            requiredMark={false}
                            disabled={formDisable}
                            onFinish={finishFormHandler}>
                            <Form.Item label="Ваше ФИО" initialValue={user?.firstname ?? ""} name="name" rules={[{ required: true, message: "Введите имя" }]}>
                                <Input placeholder="ФИО..." />
                            </Form.Item>

                            <div style={{ display: "flex", gap: 15 }}>
                                <Form.Item style={{ flexGrow: 1 }} initialValue={user?.phone ?? ""} label="Номер телефона" name="phone" rules={[{ required: true, message: "Введите номер телефона" }]}>
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

                                <Form.Item style={{ marginBottom: 8, flexGrow: 1 }} initialValue={user?.email ?? ""} label="Ваш E-mail" name="emailCustomer" rules={[
                                    { required: true, message: "Введите почту" },
                                    { pattern: regExEmail, message: errorMessageEmail }
                                ]}>
                                    <Input placeholder="mail@mail.ru" />
                                </Form.Item>
                                
                            </div>
                        </Form>
                        <div style={{display: "flex", gap: 15, paddingTop: 25}}>
                            <div style={{flexGrow: 1}}>
                                <Button buttonContent="Изменить пароль" clickHandler={() => console.log("Изменить пароль")}/>
                            </div>
                            <div style={{flexGrow: 1}}>
                                <SecondaryButton buttonContent="Удалить профиль" clickHandler={() => console.log("Удалить профиль")}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalEmpty isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
                <TryPhoto/>
            </ModalEmpty>
        </div>
    )
}

export default Profile;