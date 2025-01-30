import { Button, Checkbox, Form, FormProps, Input } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../../../../entities/credential/redux/asyncThunk";
import { selectAuth } from "../../../../entities/credential/redux/selectors";
import Container from "../../../../shared/ui/containerMain/ContainerMain";
import { ADMIN_PATH, PROFILE_PATH } from "../../../../shared/utils/constants";
import { regExEmail, errorMessageEmail } from "../../../../shared/utils/validationConstants";
import { AuthDto } from "../../../../store/auth";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { ButtonText, NamePage } from "../products/Products";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const Login: React.FC = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectAuth);

    const onFinish = async (values: AuthDto) => {
        dispatch(loginThunk(values));
    };

    useEffect(() => {
        if (isAuth) navigate(ADMIN_PATH);
    }, [isAuth])


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
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
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

                    <Form.Item<FieldType>
                        label="Пароль"
                        name="password"
                        rules={[{ required: true, message: 'Введите пароль!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <div style={{ left: "50%" }}>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
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