import { Checkbox, ConfigProvider, Form, Input } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginThunk } from "../../../entities/credential/redux/asyncThunk";
import { selectAuth } from "../../../entities/credential/redux/selectors";
import Button from "../../../shared/ui/button/Button";
import SecondaryButton from "../../../shared/ui/button/SecondaryButton";
import TextButton from "../../../shared/ui/button/TextButton";
import { Title } from "../../../shared/ui/forAdditionalPages/Title";
import { PROFILE_PATH, RECOVERY_PASSWORD_PATH, REGIST_PATH } from "../../../shared/utils/constants";
import { errorMessageEmail, regExEmail } from "../../../shared/utils/validationConstants";
import { AuthDto } from "../../../store/auth";
import { useAppDispatch, useAppSelector } from "../../../store/store";

const Auth: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [form] = Form.useForm();

    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectAuth);

    const onFinish = async (values: AuthDto) => {
        dispatch(loginThunk(values));
    };

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
        <div
            style={{display: "flex", flexDirection: "column", gap: 32}}>
            <Title style={{fontSize: 24}}>Войти в личный кабинет</Title>
            <Form 
                style={{display: "flex", flexDirection: "column", gap: 24}}
                form={form}
                onFinish={onFinish}
                layout="vertical"
                requiredMark={false}>
                <div>
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
                        style={{ marginBottom: 8, flexGrow: 1 }}
                        label="Ваш пароль"
                        name="password"
                        rules={[
                            {required: true, message: "Введите ваш пароль"}
                        ]}>
                        <Input.Password
                            placeholder="Введите ваш пароль"
                            />
                    </Form.Item>
                </div>

                <div style={{ display: "flex", gap: 10, justifyContent: "space-between", alignItems: "center" }}>
                    <Form.Item style={{margin: 0}} name="rememberMe" initialValue={true} valuePropName="checked">
                        <Checkbox><Content style={{color: "var(--secondary-text-color)", fontSize: 16}}>Запомнить меня</Content></Checkbox>
                    </Form.Item>

                    <TextButton buttonContent="Забыли пароль?" clickHandler={() => navigate(RECOVERY_PASSWORD_PATH, {state: {previousLocation: location}})}/>
                </div>

                <div style={{display: "flex", gap: 30, justifyContent: "space-between", alignItems: "center"}}>
                    <div style={{flexGrow: 1}}>
                        <SecondaryButton buttonContent={"Зарегистрироваться"} clickHandler={() => navigate(REGIST_PATH, {state: {previousLocation: location}})}/>
                    </div>

                    <Form.Item style={{flexGrow: 1, margin: 0}}>
                        <Button buttonContent="Войти в кабинет" clickHandler={() => {}}/>
                    </Form.Item>
                </div>
            </Form>
        </div>
        </ConfigProvider>
    )
}

export default Auth;