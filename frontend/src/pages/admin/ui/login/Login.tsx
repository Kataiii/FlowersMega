import { Button, Checkbox, Form, FormProps, Input } from "antd";
import { useNavigate } from "react-router-dom";
import Container from "../../../../shared/ui/containerMain/ContainerMain";
import { ADMIN_PATH } from "../../../../shared/utils/constants";
import { ButtonText, NamePage } from "../products/Products";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Login: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div style={{ position: "absolute", width: "400px", height: "350px", left: "35%", top: "35%" }}>
                <p style={{ display: "block", margin: "auto", textAlign: "center", padding: "0 0 25px 125px", fontWeight: "bold", fontSize: "24px" }}><NamePage>Авторизация</NamePage></p>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: "100%", height: "auto", display: "block", margin: "0 auto" }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Логин"
                        name="username"
                        rules={[{ required: true, message: 'Введите логин!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Пароль"
                        name="password"
                        rules={[{ required: true, message: 'Введите пароль!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <div style={{ left: "50%" }}>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" onClick={() => navigate(ADMIN_PATH)}>
                                <ButtonText>Войти</ButtonText>
                            </Button>
                        </Form.Item>
                    </div>

                </Form>
            </div>

        </div>

    )

}

export default Login;