import { Checkbox, ConfigProvider, Form, Input } from "antd";
import PhoneInput from "react-phone-input-2";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Button from "../../shared/ui/button/Button";

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

    const onFinish = (values: any) => {
        console.log(values);
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
                        }} placeholder="+7(XXX)XXX-XX-XX" onlyCountries={['ru']}/>
                    </Form.Item>
                </div>

                <Form.Item label="" name="disabled" valuePropName="checked" rules={[{ required: true, message: "Обязательное поле" }]}>
                    <Checkbox><Content style={{color: "var(--secondary-text-color)"}}>Я согласен на <Link style={{color: "var(--primary-bg-color)"}} to={'#'}>обработку персональных данных</Link></Content></Checkbox>
                </Form.Item>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Form.Item>
                        <Button buttonContent={"Заказать звонок"} clickHandler={() => console.log()}></Button>
                    </Form.Item>
                </div>
            </Form>
        </ConfigProvider>
    )
}

export default OrderCall;