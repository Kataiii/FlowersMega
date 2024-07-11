import { Form, Input } from "antd";
import Button from "../../../shared/ui/button/Button";
import { Text } from "../../../shared/ui/forAdditionalPages/Content";
import { Title } from "../../../shared/ui/forAdditionalPages/Title";
import { errorMessageEmail, regExEmail } from "../../../shared/utils/validationConstants";

const RecoveryPassword: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        //TODO запрос и переход в кабинет
        console.log(values);
    };

    return(
        <div style={{display: "flex", flexDirection: "column", gap: 16}}>
            <Title style={{fontSize: 24}}>Восстановление пароля</Title>
            <Text style={{fontSize: 16, color: "var(--text-modal)"}}>Пароль будет отправлен на Ваш E-mail</Text>
            <Form
                style={{display: "flex", flexDirection: "column", gap: 32, padding: "10px 0"}}
                form={form}
                onFinish={onFinish}
                layout="vertical"
                requiredMark={false}>
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

                <div style={{display: "flex", justifyContent: "end"}}>
                    <Form.Item style={{width: "40%", margin: 0}}>
                        <Button buttonContent="Отправить" clickHandler={() => {}}/>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default RecoveryPassword;