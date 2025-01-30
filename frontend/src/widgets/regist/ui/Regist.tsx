import { ConfigProvider, Form, Input, Modal } from "antd";
import { RuleObject } from "antd/es/form";
import { SetStateAction, useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";
import { loginThunk, registThunk } from "../../../entities/credential/redux/asyncThunk";
import { selectAuth } from "../../../entities/credential/redux/selectors";
import Button from "../../../shared/ui/button/Button";
import SecondaryButton from "../../../shared/ui/button/SecondaryButton";
import { Title } from "../../../shared/ui/forAdditionalPages/Title";
import { AUTH_PATH, HOME_PATH, PROFILE_PATH, REGIST_PATH } from "../../../shared/utils/constants";
import { errorMessageEmail, regExEmail } from "../../../shared/utils/validationConstants";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import ModalRoute from "../../../shared/ui/modalRoute/ModalRoute";
import ModalEmpty from "../../../shared/ui/modalEmpty/ModalEmpty";
import { styled } from "styled-components";

export const Text = styled.p`
  font-size: 12px;
  font-weight: 400;
`;

const Regist: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [nextPassword, setNextPassword] = useState<string>("");
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectAuth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const onFinish = async (values: any) => {
        try {
            const resultAction = await dispatch(registThunk(values));
            if (registThunk.rejected.match(resultAction)) {
                if (resultAction.payload === "Such an account already exists") {
                    setIsModalOpen(true);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const validationPassword = (rule: RuleObject, value: any, callback: (error?: string | undefined) => void) => {
        if (nextPassword === value) {
            callback();
            return;
        }
        callback("Нет совпадения");
    }



    useEffect(() => {
        if (isAuth) navigate(PROFILE_PATH);
    }, [isAuth])

    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: "Inter",
                    colorText: "var(--text-modal)",
                    colorTextDescription: "var(--text-modal)",
                    fontSize: 12,
                    colorTextTertiary: "var(--text-modal)",
                    colorTextLabel: "var(--text-modal)",
                    colorBorder: "var(--primary-bg-color)"
                },
                components: {
                    Segmented: {
                        itemSelectedBg: "var(--primary-bg-color)",
                        itemSelectedColor: "var(--primary-text-color)",
                        trackBg: "var(--block-bg-color)",
                        itemHoverBg: "var(--block-bg-color-hover)",
                        colorText: "var(--primary-bg-color)",
                        colorBorder: "var(--primary-bg-color)"
                    },
                    Input: {
                        colorText: "var(--secondary-text-color)"
                    }
                }
            }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                <Title style={{ fontSize: 24 }}>Регистрация</Title>
                <Form
                    style={{ display: "flex", flexDirection: "column", gap: 16 }}
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark={false}
                >
                    <Form.Item
                        style={{ marginBottom: 8, flexGrow: 1, color: "var(--text-modal)" }}
                        label="Ваше ФИО"
                        name="name"
                        rules={[
                            { required: true, message: "Поле обязательно для заполнения" }
                        ]}>
                        <Input placeholder="Ваше ФИО" />
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: 8, flexGrow: 1 }}
                        label="Ваш E-mail"
                        name="email"
                        rules={[
                            { required: true, message: "Введите вашу почту" },
                            { pattern: regExEmail, message: errorMessageEmail }
                        ]}
                    >
                        <Input placeholder="mail@mail.ru" />
                    </Form.Item>

                    <Form.Item
                        style={{ margin: 0 }}
                        label="Ваш телефон"
                        name="phone"
                        rules={[
                            { required: true, message: "Введите ваш телефон" }
                        ]}>
                        <PhoneInput
                            specialLabel=""
                            inputStyle={{
                                fontFamily: "Inter",
                                width: "100%",
                                height: 32,
                                border: "1px solid var(--primary-bg-color)",
                                borderRadius: 4,
                                padding: "0 11px",
                                outline: "none",
                                margin: 0
                            }} placeholder="+7(XXX)XXX-XX-XX" onlyCountries={['ru']} />
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: 8, flexGrow: 1 }}
                        label="Ваш пароль"
                        name="password"
                        rules={[
                            { required: true, message: "Введите ваш пароль" }
                        ]}>
                        <Input.Password
                            onChange={(e) => setNextPassword(e.target.value)}
                            placeholder="Введите ваш пароль"
                        />
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: 8, flexGrow: 1 }}
                        label="Повторите пароль"
                        name="repeatPassword"
                        rules={[
                            { required: true, message: "Введите ваш пароль" },
                            { validator: validationPassword, message: "Пароли не совпадают" }
                        ]}>
                        <Input.Password
                            placeholder="Введите ваш пароль"
                        />
                    </Form.Item>

                    <div style={{ display: "flex", gap: 30, justifyContent: "space-between", alignItems: "center", paddingTop: 15 }}>
                        <div style={{ flexGrow: 1 }}>
                            <SecondaryButton buttonContent={"Войти в кабинет"} clickHandler={() => navigate(AUTH_PATH, { state: { previousLocation: HOME_PATH } })} />
                        </div>

                        <Form.Item style={{ flexGrow: 1, margin: 0 }}>
                            <Button
                                buttonContent="Зарегистрироваться"
                                clickHandler={() => { }}
                            />
                        </Form.Item>
                    </div>
                </Form>
                <ModalEmpty isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                    <div>
                        <Title style={{ fontSize: 24 }}>Ошибка регистрации</Title>
                        <Text style={{ color: "red", fontFamily: "Inter" }}>Аккаунт с такими данными уже существует, пройдите авторизацию</Text>
                        <div style={{ display: "flex", gap: 15, justifyContent: "space-between", alignItems: "center", paddingTop: 15 }}>
                            <div style={{ flexGrow: 1 }}>
                                <SecondaryButton buttonContent={"Войти в кабинет"} clickHandler={() => navigate(AUTH_PATH, { state: { previousLocation: HOME_PATH } })} />
                            </div>

                            <div style={{ flexGrow: 1 }}>
                                <Button
                                    buttonContent="Зарегистрироваться"
                                    clickHandler={() => setIsModalOpen(false)}
                                />
                            </div>
                        </div>
                    </div>
                </ModalEmpty>
            </div>
        </ConfigProvider>
    )
}

export default Regist;