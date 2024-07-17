import { Form, Image, Input } from "antd";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { selectUser } from "../../entities/credential/redux/selectors";
import { addCredentialsUser } from "../../entities/credential/redux/slice";
import Button, { ButtonStyle } from "../../shared/ui/button/Button";
import { Title } from "../../shared/ui/forAdditionalPages/Title";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useUsersControllerUpdateMutation } from "../../store/user";
import Error from "../../shared/assets/no-image.png";
import PhoneInput from "react-phone-input-2";
import { errorMessageEmail, regExEmail } from "../../shared/utils/validationConstants";
import SecondaryButton from "../../shared/ui/button/SecondaryButton";
import { API_URL } from "../../shared/utils/constants";

const ChangeButtonForm = styled(ButtonStyle)<{ $primary?: boolean; }>`
  background-color: ${props => props.$primary ? "var(--primary-bg-color)" : "var(--secondary-bg-color)"};
  color: var(--primary-text-color);
  cursor: pointer;

  &:hover{
    background-color: ${props => props.$primary ? "var(--primary-bg-color-hover)" : "var(--secondary-bg-color-hover)"};
  }
`;

type FormValues = {
    name: string;
    phone: string;
    email: string;
}

type ProfileFormProps = {
    buttonLoadPhoto: React.ReactElement;
    buttonChangePassword: React.ReactElement;
}

const ProfileForm: React.FC<ProfileFormProps> = ({buttonLoadPhoto, buttonChangePassword}) => {
    const [ formDisable, setFormDisable ] = useState<boolean>(true);
    const user = useAppSelector(selectUser);
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const [ updateUser, {isLoading, data, isError, isSuccess}] = useUsersControllerUpdateMutation();
    

    const changeFormHandler = () => {
        if(!formDisable){
            form.submit();
        }
        setFormDisable(prev => !prev);
    }

    const finishFormHandler = (values: FormValues) => {
        updateUser({updateUserDto: { firstname: values.name, phone: values.phone, email: values.email }});
    }

    useEffect(() => {
        if(!isLoading && isSuccess && data){
            dispatch(addCredentialsUser(data));
        }
    }, [isLoading, isSuccess]);

    return (
        <>
            <div style={{ width: "100%", padding: 35, borderBottom: "1px solid #F5EFF5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Title style={{ fontSize: 24 }}>Личные данные</Title>
                <div style={{ width: 200 }}>
                    <ChangeButtonForm $primary={formDisable ? true : false} onClick={changeFormHandler}>{formDisable ? "Изменить" : "Сохранить"}</ChangeButtonForm>
                </div>
            </div>
            <div style={{ width: "100%", padding: "35px 70px" }}>
                <div style={{ display: "flex", gap: 70 }}>

                    <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center", justifyContent: "center" }}>
                        <Image
                            src={`${API_URL}/users/${user?.urlAvatar}`}
                            width={120}
                            height={120}
                            style={{ borderRadius: 64 }}
                            fallback={Error} />
                        {
                            buttonLoadPhoto
                        }
                    </div>

                    <div style={{ flexGrow: 1 }}>
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

                                <Form.Item style={{ marginBottom: 8, flexGrow: 1 }} initialValue={user?.email ?? ""} label="Ваш E-mail" name="email" rules={[
                                    { required: true, message: "Введите почту" },
                                    { pattern: regExEmail, message: errorMessageEmail }
                                ]}>
                                    <Input placeholder="mail@mail.ru" />
                                </Form.Item>

                            </div>
                        </Form>
                        <div style={{ display: "flex", gap: 15, paddingTop: 25 }}>
                            <div style={{ flexGrow: 1 }}>
                                { buttonChangePassword }
                            </div>
                            <div style={{ flexGrow: 1 }}>
                                <SecondaryButton buttonContent="Удалить профиль" clickHandler={() => console.log("Удалить профиль")} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileForm;