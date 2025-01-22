import { Checkbox, CheckboxProps, ConfigProvider, DatePicker, Form, Input, Result, Segmented, Tabs, TabsProps, TimePicker } from "antd";
import PhoneInput from "react-phone-input-2";
import { styled } from "styled-components";
import locale from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useEffect, useMemo, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { errorMessageCity, errorMessageEmail, errorMessageName, errorMessageStreet, regExEmail, regExName } from "../../shared/utils/validationConstants";
import { useAppSelector } from "../../store/store";
import { selectUser } from "../../entities/credential/redux/selectors";
import Button from "../../shared/ui/button/Button";
import { selectActiveCity } from "../../entities/city/redux/selectors";
import styles from "./FormOrder.module.css";
import Transforms from "../../shared/utils/transforms";
import { ItemOrder, OrdersControllerCreateApiArg, Postcard, useOrdersControllerCreateMutation } from "../../store/order";
import { cartSelectors } from "../../entities/cart/redux/selectors";
import OrderEmpty from "../../entities/order/ui/OrderEmpty";
import ModalEmpty from "../../shared/ui/modalEmpty/ModalEmpty";
import { useNavigate } from "react-router-dom";
import { CATALOG_PATH } from "../../shared/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllFromCart } from "../../entities/cart/redux/slice";
import { postcardsSelectors } from "../../entities/postcard/redux/selectors";
import { clearStore } from "../../entities/postcard/redux/slice";

const TitleForm = styled.h4`
    font-family: "Inter";
    font-weight: 600;
    font-size: 20px;
    color: var(--secondary-text-color);
`;

type FormValues = {
    addressArea: string;
    addressCorpus?: string;
    addressEntrance?: string;
    addressFlat?: string;
    addressFloor?: string;
    addressHouse: string;
    addressStreet: string;
    comment?: string;
    dateDelivery: any;
    emailCustomer: string;
    endTimeDelivery: any;
    nameCustomer: string;
    nameRecipient?: string;
    notCall: boolean;
    phoneCustomer: string;
    phoneRecipient?: string;
    recipientCustomer: boolean;
    startTimeDelivery: any;
}

const FormOrder: React.FC = () => {
    const [isRecipientCustomer, setIsRecipientCustomer] = useState<boolean>(false);
    const [isExsistingCity, setIsExsistingCity] = useState<boolean>(true);
    const [createOrder, { isSuccess }] = useOrdersControllerCreateMutation();
    const user = useAppSelector(selectUser);
    const city = useAppSelector(selectActiveCity);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const postcards = useSelector(postcardsSelectors.selectAll);
    const productsInCart = useAppSelector(cartSelectors.selectAll);
    const totalCost = useMemo(
        () => productsInCart.map(p => p.count * (p.prise ?? 0)).reduce((prev, curr) => prev + curr, 0),
        [productsInCart]
    )
    const handleOrderSubmit = () => {
        dispatch(clearStore());
    };
    // const getUpdatedPostcards = () => {
    //     return postcards.map((postcard) => {
    //         const newId = `${postcard.id}-productSize-${product.id}`;
    //         return { ...postcard, updatedId: newId };
    //     });
    // };
    const [form] = Form.useForm();

    const onFinish = async (values: FormValues) => {
        const tryValues = {
            ...values,
            'dateDelivery': values['dateDelivery'].format('DD.MM.YYYY'),
            'startTimeDelivery': values['startTimeDelivery'].format('HH:mm'),
            'endTimeDelivery': values['endTimeDelivery'].format('HH:mm')
        }
        console.log(tryValues.startTimeDelivery, "STAAAAAAAAAAAAAAAAAAAART");
        console.log(tryValues.endTimeDelivery, "ENDDDDDDDDDDDDDDDDDDDDD");
        const dto: OrdersControllerCreateApiArg = {
            body: {
                name: '',
                dateOrder: new Date().toLocaleString(),
                dateDelivery: tryValues.dateDelivery,
                cost: totalCost,
                nameCustomer: tryValues.nameCustomer,
                emailCustomer: tryValues.emailCustomer,
                phoneCustomer: tryValues.phoneCustomer,
                nameRecipient: tryValues.recipientCustomer ? tryValues.nameCustomer : (tryValues.nameRecipient ?? ''),
                phoneRecipient: tryValues.recipientCustomer ? tryValues.phoneCustomer : (tryValues.phoneRecipient ?? ''),
                canCall: tryValues.notCall,
                idCity: isExsistingCity ? (city?.id ?? -1) : -1,
                addressDelivery: Transforms.transformAddress(
                    values.addressArea,
                    values.addressStreet,
                    values.addressHouse,
                    values.addressCorpus,
                    values.addressEntrance,
                    values.addressFloor,
                    values.addressFlat
                ),
                startTimeDelivery: tryValues.startTimeDelivery,
                endTimeDelivery: tryValues.endTimeDelivery,
                comment: tryValues.comment,
                itemsOrder: productsInCart.map(item => {
                    return {
                        count: item.count,
                        product: {
                            id: item.id,
                            idProduct: item.idProduct,
                            idSize: item.idSize,
                            paramsSize: item.paramsSize,
                            count: item.count,
                            prise: item.prise
                        }
                    } as ItemOrder
                }),
                postcards: postcards.map(postcard => {
                    return {
                        id: postcard.id,
                        text: postcard.text,
                        updatedId: postcard.updatedId
                    } as Postcard
                })
            }
        }

        createOrder(dto);
        dispatch(deleteAllFromCart());
    };

    const changeRecepientCustomer: CheckboxProps['onChange'] = (e) => {
        setIsRecipientCustomer(e.target.checked);
    };

    const disabledDate = (date: dayjs.Dayjs) => {
        if (date.toDate() < new Date(new Date().setDate(new Date().getDate() - 1))) return true;
        return false;
    }

    useEffect(() => {
        if (isSuccess) setIsOpen(true);
    }, [isSuccess]);

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
                    width: "100%"
                }}
            >
                <div>
                    <TitleForm>Отправитель</TitleForm>
                    <Form.Item style={{ marginBottom: 8, color: "var(--text-modal)" }} initialValue={user !== null ? user.firstname : ""} label="Ваше ФИО" name="nameCustomer" rules={[
                        { required: true, message: "Введите ФИО" },
                        { pattern: regExName, message: errorMessageName }]}>
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
                            : <Form.Item style={{ marginBottom: 8 }} label="ФИО получателя" name="nameRecipient" rules={[
                                { required: true, message: "Введите ФИО" },
                                { pattern: regExName, message: errorMessageName }]}>
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
                    <Form.Item style={{ marginBottom: 8 }} label="Область, населенный пункт" initialValue={isExsistingCity && city ? city.name : ""} name="addressArea" rules={[
                        { required: true, message: "Введите населенный пункт" },
                        { pattern: regExName, message: errorMessageCity }]}>
                        {
                            isExsistingCity
                                ? <Input size="large" placeholder="Населенный пункт" />
                                : <Input size="large" placeholder="Область, населенный пункт" />
                        }
                    </Form.Item>

                    <div style={{ display: "flex", gap: 15 }}>
                        <Form.Item style={{ flexGrow: 4, marginBottom: 8 }} label="Улица" name="addressStreet" rules={[
                            { required: true, message: "Введите улицу" },
                            { pattern: regExName, message: errorMessageStreet }]}>
                            <Input size="large" placeholder="Улица" />
                        </Form.Item>
                        <Form.Item style={{ flexGrow: 1, marginBottom: 8 }} label="Дом" name="addressHouse" rules={[{ required: true, message: "Введите номер дома" }]}>
                            <Input size="large" placeholder="Дом" />
                        </Form.Item>
                    </div>
                    <div style={{ display: "flex", gap: 15 }}>
                        <Form.Item style={{ flexGrow: 1, marginBottom: 8 }} label="Корпус" name="addressCorpus">
                            <Input size="large" placeholder="Корпус" onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }} />
                        </Form.Item>
                        <Form.Item style={{ flexGrow: 1, marginBottom: 8 }} label="Подъезд" name="addressEntrance">
                            <Input size="large" placeholder="Подьезд" onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }} />
                        </Form.Item>
                        <Form.Item style={{ flexGrow: 1, marginBottom: 8 }} label="Этаж" name="addressFloor">
                            <Input size="large" placeholder="Этаж" onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }} />
                        </Form.Item>
                        <Form.Item style={{ flexGrow: 1, marginBottom: 8 }} label="Квартира" name="addressFlat" rules={[
                            { required: true, message: "Введите номер квартиры" }]}>
                            <Input size="large" placeholder="Квартира" onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }} />
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
                            <DatePicker style={{ width: "100%" }} size="large" disabledDate={disabledDate} format={"DD.MM.YYYY"} />
                        </Form.Item>
                        <div style={{ width: 250, display: "flex", flexDirection: "column", gap: 8 }}>
                            <p>Время доставки</p>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                border: "1px solid var(--primary-bg-color)",
                                borderRadius: 4,
                                padding: "0 8px"
                            }}>
                                <p style={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: 20,
                                    color: "var(--primary-bg-color)"
                                }}>с</p>
                                <Form.Item
                                    style={{ marginBottom: 0 }}
                                    name="startTimeDelivery"
                                    rules={[{ type: 'object' as const, required: true, message: 'Выберите время доставки' }]}>
                                    <TimePicker style={{ border: "none" }} placeholder="00:00" size="large" format={'HH:mm'} />
                                </Form.Item>
                                <p style={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    fontSize: 20,
                                    color: "var(--primary-bg-color)"
                                }}>до</p>
                                <Form.Item
                                    style={{ marginBottom: 0 }}
                                    name="endTimeDelivery"
                                    rules={[{ type: 'object' as const, required: true, message: 'Выберите время доставки' }]}>
                                    <TimePicker style={{ border: "none" }} placeholder="00:00" size="large" format={'HH:mm'} />
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
                    <Button buttonContent="Оформить заказ" clickHandler={() => { setTimeout(handleOrderSubmit), 2000 }} />
                </div>
            </Form>
            {
                isSuccess
                    ? <ModalEmpty isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
                        <Result
                            status="success"
                            title="Ваш заказ создан!"
                            subTitle="Скоро с вами свяжется менеджер для подтверждения заказа"
                            extra={[
                                <Button buttonContent="Вернуться в каталог" clickHandler={() => navigate(CATALOG_PATH)} />
                            ]}
                        />
                    </ModalEmpty>
                    : null
            }
        </ConfigProvider>
    )
}

export default FormOrder;