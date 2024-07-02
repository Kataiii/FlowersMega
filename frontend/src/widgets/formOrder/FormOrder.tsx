import { Form } from "antd";
import { styled } from "styled-components";

const TitleForm = styled.h4`
    font-family: "Inter";
    font-weight: 600;
    font-size: 20px;
    color: var(--secondary-text-color);
`;

const FormOrder: React.FC = () => {
    return(
        <Form>
            <div>
                <TitleForm>Отправитель</TitleForm>
            </div>

            <div>
                <TitleForm>Получатель</TitleForm>
            </div>

            <div>
                <TitleForm>Адрес доставки</TitleForm>
            </div>

            <div>
                <TitleForm>Дата и время доставки</TitleForm>
            </div>
        </Form>
    )
}

export default FormOrder;