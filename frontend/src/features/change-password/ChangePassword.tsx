import { ConfigProvider, Form, Input } from "antd"
import { RuleObject } from "antd/es/form";
import { useState } from "react";
import Button from "../../shared/ui/button/Button"
import { Title } from "../../shared/ui/forAdditionalPages/Title"

type PasswordForm = {
    prevPassword: string;
    nextPassword: string;
    repeatNextPassword: string; 
}

const ChangePassword: React.FC = () => {
    const [form] = Form.useForm();
    const [ nextPassword, setNextPassword ] = useState<string>("");

    const finishHandler = (values: PasswordForm) => {
        console.log(values);
    }

    const validationPassword = (rule: RuleObject, value: any, callback: (error?: string | undefined) => void) => {
        if(nextPassword === value) {
            callback();
            return;
        }
        callback("Нет совпадения");
    }

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
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 24
            }}>
                <Title style={{fontSize: 24}}>Смена пароля</Title>
                <Form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16
                    }}
                    layout="vertical"
                    form={form}
                    name="control-hooks"
                    requiredMark={false}
                    onFinish={finishHandler}>
                    <Form.Item style={{margin: 0}} label="Текущий пароль" name="prevPassword" rules={[{ required: true, message: "Введите текущий пароль" }]}>
                        <Input.Password placeholder="Текущий пароль..." />
                    </Form.Item>

                    <Form.Item 
                        style={{margin: 0}} 
                        label="Новый пароль" 
                        name="nextPassword" 
                        rules={[
                            {required: true, message: "Введите новый пароль"}
                        ]}
                    >
                        <Input.Password 
                            onChange={
                                (e) => setNextPassword(e.target.value)
                            } placeholder="Новый пароль..."/>
                    </Form.Item>

                    <Form.Item 
                        style={{margin: 0}} 
                        label="Повторите пароль" 
                        name="repeatNextPassword" 
                        rules={[
                            {required: true, message: "Введите новый пароль"},
                            {validator: validationPassword, message: "Пароли не совпадают"}
                        ]}
                    >
                        <Input.Password
                            placeholder="Новый пароль..."/>
                    </Form.Item>

                    <div style={{ paddingTop: 16 }}>
                        <Button buttonContent="Установить новый пароль" clickHandler={() => {}}/>
                    </div>
                </Form>
            </div>
        </ConfigProvider>
    )
}

export default ChangePassword