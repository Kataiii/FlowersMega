import { ConfigProvider, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/button/Button";
import SecondaryButton from "../../../shared/ui/button/SecondaryButton";
import { Title } from "../../../shared/ui/forAdditionalPages/Title";
import { AUTH_PATH, HOME_PATH } from "../../../shared/utils/constants";
import { errorMessageEmail, regExEmail } from "../../../shared/utils/validationConstants";

const Regist: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        //TODO запрос и переход в кабинет
        console.log(values);
    };

    return(
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
            <Title style={{fontSize: 24}}>Регистрация</Title>
            <Form
                style={{display: "flex", flexDirection: "column", gap: 16}}
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
                    <Input placeholder="Ваше ФИО"/>
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

                <div style={{display: "flex", gap: 30, justifyContent: "space-between", alignItems: "center", paddingTop: 15}}>
                    <div style={{flexGrow: 1}}>
                        <SecondaryButton buttonContent={"Войти в кабинет"} clickHandler={() => navigate(AUTH_PATH, {state: {previousLocation: HOME_PATH}})}/>
                    </div>

                    <Form.Item style={{flexGrow: 1, margin: 0}}>
                        <Button buttonContent="Зарегистрироваться" clickHandler={() => {}}/>
                    </Form.Item>
                </div>
            </Form>
        </div>
        </ConfigProvider>
    )
}

export default Regist;