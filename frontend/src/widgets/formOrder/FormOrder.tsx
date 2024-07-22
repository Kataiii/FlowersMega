import { Checkbox, CheckboxProps, ConfigProvider, DatePicker, Form, Input, Segmented, Tabs, TabsProps, TimePicker } from "antd";
import PhoneInput from "react-phone-input-2";
import { styled } from "styled-components";
import locale from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import CityInput from "../../entities/city/ui/cityInput/CityInput";
import { errorMessageEmail, regExEmail } from "../../shared/utils/validationConstants";
import { useAppSelector } from "../../store/store";
import { selectUser } from "../../entities/credential/redux/selectors";
import Button from "../../shared/ui/button/Button";
import { selectActiveCity } from "../../entities/city/redux/selectors";
import styles from "./FormOrder.module.css";

const TitleForm = styled.h4`
    font-family: "Inter";
    font-weight: 600;
    font-size: 20px;
    color: var(--secondary-text-color);
`;

const FormOrder: React.FC = () => {
    const [isRecipientCustomer, setIsRecipientCustomer] = useState<boolean>(false);
    const [isExsistingCity, setIsExsistingCity] = useState<boolean>(true);
    const user = useAppSelector(selectUser);
    const city = useAppSelector(selectActiveCity);

    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        const tryValues = {
            ...values,
            'dateDelivery': values['dateDelivery'].format('YYYY-MM-DD'),
            'startTimeDelivery': values['startTimeDelivery'].format('HH:mm:ss'),
            'endTimeDelivery': values['endTimeDelivery'].format('HH:mm:ss')
        }
        console.log(tryValues);
    };

    const changeRecepientCustomer: CheckboxProps['onChange'] = (e) => {
        setIsRecipientCustomer(e.target.checked);
    };

    const disabledDate = (date: dayjs.Dayjs) => {
        if (date.toDate() < new Date(new Date().setDate(new Date().getDate() - 1))) return true;
        return false;
    }

    return (
        <ConfigProvider
            locale={locale}
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
                        colorText: "var(--secondary-text-color)",
                        borderRadius: 4,
                        borderRadiusLG: 4
                    }
                }
            }}>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                style={{
                    backgroundColor: "var(--block-bg-color)",
                    borderRadius: 8,
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 15,
                    width: "60%"
                }}
            >
                <div>
                    <TitleForm>Отправитель</TitleForm>
                    <Form.Item style={{ marginBottom: 8, color: "var(--text-modal)" }} initialValue={user !== null ? user.firstname : ""} label="Ваше ФИО" name="nameCustomer" rules={[{ required: true, message: "Введите ФИО" }]}>
                        <Input size="large" placeholder="Иванов Иван Иванович" />
                    </Form.Item>
                    <div style={{ display: "flex", gap: 15 }}>
                        <Form.Item style={{ marginBottom: 8, flexGrow: 1 }} initialValue={user !== null ? user.email : ""} label="Ваш E-mail" name="emailCustomer" rules={[
                            { required: true, message: "Введите почту" },
                            { pattern: regExEmail, message: errorMessageEmail }
                        ]}>
                            <Input size="large" placeholder="mail@mail.ru" />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 8, flexGrow: 1 }} label="Номер телефона" initialValue={user !== null ? user.phone : ""} name="phoneCustomer" rules={[{ required: true, message: "Введите номер телефона" }]}>
                            <PhoneInput
                                specialLabel=""
                                inputStyle={{
                                    fontFamily: "Inter",
                                    width: "100%",
                                    height: 40,
                                    border: "1px solid var(--primary-bg-color)",
                                    borderRadius: 4,
                                    padding: "0 11px",
                                    outline: "none"
                                }} placeholder="+7(XXX)XXX-XX-XX" onlyCountries={['ru']} />
                        </Form.Item>
                    </div>

                    <Form.Item initialValue={false} style={{ marginBottom: 0, color: "var(--secondary-text-color)" }} label="" name="recipientCustomer" valuePropName="checked">
                        <Checkbox onChange={changeRecepientCustomer}>Отправитель является получателем</Checkbox>
                    </Form.Item>
                </div>


                <div>
                    <TitleForm>Получатель</TitleForm>
                    {

                        isRecipientCustomer
                            ? <p style={{ fontSize: 16 }}>Данные возьмутся автоматически из полей об отправителе</p>
                            : <Form.Item style={{ marginBottom: 8 }} label="ФИО получателя" name="nameRecipient" rules={[{ required: true, message: "Введите ФИО" }]}>
                                <Input size="large" value={isRecipientCustomer ? user?.firstname : ""} placeholder="Иванов Иван Иванович" />
                            </Form.Item>
                    }

                    <div style={{ display: "flex", gap: 15, alignItems: "flex-end" }}>
                        {
                            isRecipientCustomer
                                ? null
                                : <Form.Item style={{ flexGrow: 1, marginBottom: 8 }} label="Номер телефона" name="phoneRecipient" rules={[{ required: true, message: "Введите номер телефона" }]}>
                                    <PhoneInput
                                        specialLabel=""
                                        inputStyle={{
                                            fontFamily: "Inter",
                                            width: "100%",
                                            height: 40,
                                            border: "1px solid var(--primary-bg-color)",
                                            borderRadius: 4,
                                            padding: "0 11px",
                                            outline: "none"
                                        }} placeholder="+7(XXX)XXX-XX-XX" onlyCountries={['ru']} />
                                </Form.Item>
                        }

                        <Form.Item initialValue={false} style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%", marginBottom: 8 }} label="" name="notCall" valuePropName="checked">
                            <Checkbox>Не звонить получателю перед доставкой</Checkbox>
                        </Form.Item>
                    </div>
                    <p>Мы повезём букет без звонка получателю в указанное Вами время.</p>
                </div>

                <div>
                    <TitleForm>Адрес доставки</TitleForm>
                    <Segmented
                        style={{ margin: "10px 0", border: "1px solid var(--primary-bg-color)", padding: 0 }}
                        options={['Город из списка', 'Другой населённый пункт']}
                        onChange={(value) => {
                            setIsExsistingCity(value === 'Город из списка');
                        }}
                        block
                    />
                    <Form.Item style={{marginBottom: 8}} label="Область, населенный пункт" initialValue={isExsistingCity && city ? city.name : ""} name="addressArea" rules={[{ required: true, message: "Введите населенный пункт" }]}>
                    {
                        isExsistingCity
                            ?   <Input size="large" placeholder="Населенный пункт" />
                            :   <Input size="large" placeholder="Область, населенный пункт" />
                    }
                     </Form.Item>

                    <div style={{ display: "flex", gap: 15 }}>
                        <Form.Item style={{ flexGrow: 4, marginBottom: 8 }} label="Улица" name="addressStreet" rules={[{ required: true, message: "Введите улицу" }]}>
                            <Input size="large" placeholder="Улица" />
                        </Form.Item>
                        <Form.Item style={{ flexGrow: 1, marginBottom: 8 }} label="Дом" name="addressHouse" rules={[{ required: true, message: "Введите дом" }]}>
                            <Input size="large" placeholder="Дом" />
                        </Form.Item>
                    </div>
                    <div style={{ display: "flex", gap: 15 }}>
                        <Form.Item style={{ flexGrow: 1, marginBottom: 8 }} label="Корпус" name="addressCorpus">
                            <Input size="large" placeholder="Корпус" />
                        </Form.Item>
                        <Form.Item style={{ flexGrow: 1, marginBottom: 8 }} label="Подъезд" name="addressEntrance">
                            <Input size="large" placeholder="Подьезд" />
                        </Form.Item>
                        <Form.Item style={{ flexGrow: 1, marginBottom: 8 }} label="Этаж" name="addressFloor">
                            <Input size="large" placeholder="Этаж" />
                        </Form.Item>
                        <Form.Item style={{ flexGrow: 1, marginBottom: 8 }} label="Квартира" name="addressFlat">
                            <Input size="large" placeholder="Квартира" />
                        </Form.Item>
                    </div>
                </div>

                <div>
                    <TitleForm>Дата и время доставки</TitleForm>
                    <div style={{ display: "flex", gap: 15 }}>
                        <Form.Item
                            className={styles.WrapDate} 
                            label="Дата доставки" 
                            name="dateDelivery" 
                            style={{ flexGrow: 1, display: "flex" }}
                            rules={[{ type: 'object' as const, required: true, message: 'Выберите дату доставки' }]}>
                                <DatePicker style={{width: "100%"}} size="large" disabledDate={disabledDate} format={"DD-MM-YYYY"} />
                        </Form.Item>
                        <div style={{ width: 250, display: "flex", flexDirection: "column", gap: 8 }}>
                            <p>Время доставки</p>
                            <div style={{ 
                                display: "flex", 
                                alignItems: "center", 
                                gap: 10, 
                                border: "1px solid var(--primary-bg-color)",
                                borderRadius: 4,
                                padding: "0 8px" }}>
                                <p style={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: 20,
                                    color: "var(--primary-bg-color)"
                                }}>с</p>
                                <Form.Item
                                    style={{marginBottom: 0}}
                                    name="startTimeDelivery"
                                    rules={[{ type: 'object' as const, required: true, message: 'Выберите время доставки' }]}>
                                    <TimePicker style={{border: "none"}} placeholder="00:00" size="large" format={'HH:mm'} />
                                </Form.Item>
                                <p style={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: 20,
                                    color: "var(--primary-bg-color)"
                                }}>до</p>
                                <Form.Item
                                    style={{marginBottom: 0}}
                                    name="endTimeDelivery"
                                    rules={[{ type: 'object' as const, required: true, message: 'Выберите время доставки' }]}>
                                    <TimePicker style={{border: "none"}} placeholder="00:00" size="large" format={'HH:mm'} />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <TitleForm>Комментарий к заказу</TitleForm>
                    <Form.Item label="Комментарий" name="comment">
                        <TextArea
                            showCount
                            maxLength={1000}
                            placeholder="Введите ваши пожелания к заказу" />
                    </Form.Item>
                </div>

                <div style={{ width: "50%", margin: "0 auto", paddingTop: 20, paddingBottom: 30 }}>
                    <Button buttonContent="Оформить заказ" clickHandler={() => { }} />
                </div>
            </Form>
        </ConfigProvider>
    )
}

export default FormOrder;