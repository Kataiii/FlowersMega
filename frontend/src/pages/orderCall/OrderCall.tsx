import { Checkbox, ConfigProvider, Form, Input, Result } from "antd";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Button from "../../shared/ui/button/Button";
import ModalEmpty from "../../shared/ui/modalEmpty/ModalEmpty";
import { API_URL, HOME_PATH, POLITICS_PATH } from "../../shared/utils/constants";
import $api from "../../shared/utils/http";

const Title = styled.h1`
    font-family: "Inter";
    font-weight: 600;
    font-size: 24px;
    color: var(--secondary-text-color);
    margin: 0;
`;

const Content = styled.p`
    font-family: "Inter";
    font-weight: 400;
    font-size: 16px;
    color: var(--text-modal);
    margin: 0;
`;

const OrderCall: React.FC = () => {
    const [form] = Form.useForm();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        const response = await $api.post(`${API_URL}/tg-bot/order-call`, {
            name: values.name,
            phone: values.phone,
            disabled: values.disabled
        });

        setIsOpen(true);
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: "Inter",
                    fontSize: 12,
                    colorText: "var(--text-modal)"
                }
            }}
        >
            <Form
                style={{ display: "flex", flexDirection: "column", gap: 28 }}
                layout="vertical"
                form={form}
                name="control-hooks"
                onFinish={onFinish}>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <Title>Заказать звонок</Title>
                    <Content>Мы свяжемся с вами в кратчайшее время</Content>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    <Form.Item label="Ваше имя" name="name" rules={[{ required: true, message: "Введите имя" }]}>
                        <Input placeholder="Имя..." />
                    </Form.Item>

                    <Form.Item label="Номер телефона" name="phone" rules={[{ required: true, message: "Введите номер телефона" }]}>
                        <PhoneInput
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
                </div>

                <Form.Item
                    name="allowTerm" valuePropName="checked"
                    rules={[
                        {
                            required: true,
                            message: "Необходимо согласие на обработку персональных данных",
                            validator: async (_, checked) => {
                                if (!checked) {
                                    return Promise.reject(
                                        new Error("you must accept to deposit 10% of the sale price"),
                                    );
                                }
                            },
                        },
                    ]}
                >
                    <Checkbox>
                        <Content style={{ color: "var(--secondary-text-color)" }}>
                            Я согласен на{" "}
                            <Link style={{ color: "var(--primary-bg-color)" }} to={`${POLITICS_PATH}`}>
                                обработку персональных данных
                            </Link>
                        </Content>
                    </Checkbox>
                </Form.Item>


                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Form.Item>
                        <Button buttonContent={"Заказать звонок"} clickHandler={() => { }}></Button>
                    </Form.Item>
                </div>
            </Form>
            {
                isOpen
                    ? <ModalEmpty isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
                        <Result
                            status="success"
                            title="Ваш запрос создан!"
                            subTitle="Скоро с вами свяжется менеджер"
                            extra={[
                                <Button buttonContent="Вернуться на главную" clickHandler={() => navigate(HOME_PATH)} />
                            ]}
                        />
                    </ModalEmpty>
                    : null
            }
        </ConfigProvider>
    )
}

export default OrderCall;