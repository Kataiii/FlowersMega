import { Checkbox, CheckboxProps, ConfigProvider, DatePicker, Form, Input, Segmented, Tabs, TabsProps, TimePicker } from "antd";
import PhoneInput from "react-phone-input-2";
import { styled } from "styled-components";
import locale from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import CityInput from "../../entities/city/ui/cityInput/CityInput";

const TitleForm = styled.h4`
    font-family: "Inter";
    font-weight: 600;
    font-size: 20px;
    color: var(--secondary-text-color);
`;

const FormOrder: React.FC = () => {
    const [isRecipientCustomer, setIsRecipientCustomer] = useState<boolean>(false);
    const [ isExsistingCity, setIsExsistingCity ] = useState<boolean>(true);

    const changeRecepientCustomer: CheckboxProps['onChange'] = (e) => {
        setIsRecipientCustomer(e.target.checked);
    };

    return (
        <ConfigProvider
            locale={locale}
            theme={{
                token: {
                    fontFamily: "Inter",
                    colorText: "var(--secondary-text-color)",
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
                    }
                }
            }}>
            <Form
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
                    <Form.Item style={{marginBottom: 8, color: "var(--text-modal)"}} label="Ваше ФИО" name="nameCustomer" rules={[{ required: true, message: "Введите ФИО" }]}>
                        <Input placeholder="Иванов Иван Иванович" />
                    </Form.Item>
                    <div style={{ display: "flex", gap: 15 }}>
                        <Form.Item style={{marginBottom: 8, flexGrow: 1}} label="Ваш E-mail" name="emailCustomer" rules={[
                            { required: true, message: "Введите почту" },
                            { pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, message: "Некорректно введена почта" }
                        ]}>
                            <Input placeholder="mail@mail.ru" />
                        </Form.Item>

                        <Form.Item style={{marginBottom: 8, flexGrow: 1}} label="Номер телефона" name="phoneCustomer" rules={[{ required: true, message: "Введите номер телефона" }]}>
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

                    <Form.Item style={{marginBottom: 0, color: "var(--secondary-text-color)"}} label="" name="recipientCustomer" valuePropName="checked">
                        <Checkbox onChange={changeRecepientCustomer}>Отправитель является получателем</Checkbox>
                    </Form.Item>
                </div>


                <div>
                    <TitleForm>Получатель</TitleForm>
                    {
                        
                        isRecipientCustomer
                        ?   <p style={{fontSize: 16}}>Данные возьмутся автоматически из полей об отправителе</p>
                        :   <Form.Item style={{marginBottom: 8}} label="ФИО получателя" name="nameRecipient" rules={[{ required: true, message: "Введите ФИО" }]}>
                                <Input placeholder="Иванов Иван Иванович" />
                            </Form.Item>
                    }

                    <div style={{display: "flex",  gap: 15, alignItems: "flex-end"}}>
                        {
                            isRecipientCustomer
                            ?   null
                            :   <Form.Item style={{flexGrow: 1, marginBottom: 8}} label="Номер телефона" name="phoneRecipient" rules={[{ required: true, message: "Введите номер телефона" }]}>
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
                        }

                        <Form.Item style={{flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%", marginBottom: 8}} label="" name="notCall" valuePropName="checked">
                            <Checkbox>Не звонить получателю перед доставкой</Checkbox>
                        </Form.Item>
                    </div>
                    <p>Мы повезём букет без звонка получателю в указанное Вами время.</p>
                </div>


                <div>
                    <TitleForm>Дата и время доставки</TitleForm>
                    <Segmented
                        style={{margin: "10px 0"}}
                        options={['Город из списка', 'Другой населённый пункт']}
                        onChange={(value) => {
                            setIsExsistingCity(value === 'Город из списка');
                        }}
                        block
                    />
                    {
                        isExsistingCity
                        ?   
                            <Form.Item label="Область, населенный пункт" name="addressArea" rules={[{ required: true, message: "Введите населенный пункт" }]}>
                                <CityInput/>
                            </Form.Item>
                        :   <div>
                                <Form.Item label="Область, населенный пункт" name="addressArea" rules={[{ required: true, message: "Введите населенный пункт" }]}>
                                    <Input placeholder="Область, населенный пункт" />
                                </Form.Item>
                            </div>
                    }
                    <Form.Item label="Улица" name="addressStreet" rules={[{ required: true, message: "Введите улицу" }]}>
                        <Input placeholder="Улица" />
                    </Form.Item>
                    <Form.Item label="Дом" name="addressHouse" rules={[{ required: true, message: "Введите дом" }]}>
                        <Input placeholder="Дом" />
                    </Form.Item>
                    <Form.Item label="Корпус" name="addressCorpus">
                        <Input placeholder="Корпус" />
                    </Form.Item>
                    <Form.Item label="Подъезд" name="addressEntrance">
                        <Input placeholder="Подьезд" />
                    </Form.Item>
                    <Form.Item label="Этаж" name="addressEntrance">
                        <Input placeholder="Подьезд" />
                    </Form.Item>
                    <Form.Item label="Квартира" name="addressHouse">
                        <Input placeholder="Квартира" />
                    </Form.Item>

                    <div>
                        <div>
                            <p>Дата доставки</p>
                            <DatePicker format={"DD-MM-YYYY"} />
                        </div>
                        <div>
                            <p>Время доставки</p>
                            <div>
                                <p>С</p>
                                <TimePicker format={'HH:mm'} />
                                <p>ДО</p>
                                <TimePicker format={'HH:mm'} />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <TitleForm>Комментарий к заказу</TitleForm>
                    <TextArea
                        showCount
                        maxLength={1000}
                        placeholder="Введите ваши пожелания к заказу" />
                </div>
            </Form>
        </ConfigProvider>
    )
}

export default FormOrder;