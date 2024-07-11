import { CollapseProps } from "antd";
import { Text } from "../ui/forAdditionalPages/Content";

export type HelpBlock = {
    title: string;
    helpItems: CollapseProps['items'];
}

export const HelpBlocks: HelpBlock[] = [
    {
        title: "Регистрация на сайте",
        helpItems: [
            {
                key: 1,
                label: "Как зарегистрироваться на сайте?",
                children: <Text></Text>
            }
        ]
    },
    {
        title: "Заказ",
        helpItems: [
            {
                key: 2,
                label: "Как сделать заказ букета?",
                children: <Text></Text>
            },
            {
                key: 3,
                label: "Как мне внести изменения в заказ?",
                children: <Text></Text>
            },
            {
                key: 4,
                label: "В какое время можно сделать заказ?",
                children: <Text></Text>
            },
            {
                key: 5,
                label: "Будет ли заказанный букет в точности соответствовать его изображению на сайте?",
                children: <Text></Text>
            },
            {
                key: 6,
                label: "Можете ли вы собрать индивидуальный букет по моему заказу?",
                children: <Text></Text>
            },
            {
                key: 7,
                label: "Когда я смогу получить фотографию получателя с букетом?",
                children: <Text></Text>
            },
            {
                key: 8,
                label: "Гарантируются ли конфиденциальность и безопасность информации?",
                children: <Text></Text>
            }
        ]
    },
    {
        title: "Оплата заказа",
        helpItems: [
            {
                key: 9,
                label: "Как можно оплатить заказ?",
                children: <Text></Text>
            },
            {
                key: 10,
                label: "Почему долго не проходит оплата моего заказа?",
                children: <Text></Text>
            },
            {
                key: 11,
                label: "В какой валюте можно оплатить заказ? Можно ли оплатить заказ из-за границы?",
                children: <Text></Text>
            }
        ]
    },
    {
        title: "Доставка заказа",
        helpItems: [
            {
                key: 12,
                label: "Какие сроки доставки цветов?",
                children: <Text></Text>
            },
            {
                key: 13,
                label: "Звоните ли вы получателю перед доставкой? Что будет, если получателя не окажется по адресу доставки?",
                children: <Text></Text>
            },
            {
                key: 14,
                label: "В какие страны вы доставляете цветы?",
                children: <Text></Text>
            },
            {
                key: 15,
                label: "Можно ли сделать доставку в нерабочее время или ночью?",
                children: <Text></Text>
            },
            {
                key: 16,
                label: "Можете ли вы сделать доставку в отдаленный населенный пункт, отсутствующий у вас на сайте?",
                children: <Text></Text>
            },
            {
                key: 17,
                label: "Какие вы даете гарантии доставки моего заказа?",
                children: <Text></Text>
            }
        ]
    },
    {
        title: "Личный кабинет",
        helpItems: [
            {
                key: 18,
                label: "Как войти в личный кабинет?",
                children: <Text></Text>
            },
            {
                key: 19,
                label: "Что делать, если утерян пароль для входа в личный кабинет?",
                children: <Text></Text>
            }
        ]
    },
    {
        title: "Акции и бонусная программа",
        helpItems: [
            {
                key: 20,
                label: "Есть ли у вас система скидок?",
                children: <Text></Text>
            }
        ]
    },
    {
        title: "Партнёрам",
        helpItems: [
            {
                key: 21,
                label: "Как начать сотрудничество?",
                children: <Text></Text>
            }
        ]
    },
    {
        title: "Полезная информация",
        helpItems: [
            {
                key: 22,
                label: "Особенности ухода за срезанными цветами",
                children: <Text>{`Живые цветы создают праздничную атмосферу. Всего один маленький букетик на крестинах, новоселье или дне рождения способен поднять гостям настроение и оставить у них приятные впечатления о вечере. Подаренные цветы вы можете сразу ставить в вазу — они уже обработаны флористом. Однако чтобы букет простоял как можно дольше, советуем воспользоваться рекомендациями из этой статьи. Конечно, все индивидуально: одни сорта цветов остаются свежими дольше других. Но есть несколько общих правил, выполнение которых сохранит свежесть срезанных растений.`}</Text>
            },
            {
                key: 23,
                label: "Советы по уходу",
                children: 
                    <div>
                        <Text>{
                            `Не переносите букет сразу из холода в тепло. Резкая смена температуры вредит цветам, от этого они быстрее вянут. Если вы принесли цветы с улицы в отапливаемый дом, сначала оставьте их на прохладной веранде, в вестибюле. Дайте растениям привыкнуть к повышению температуры. Лишь после этого можно начать обработку стеблей.
                            Как только вы получили в подарок букет или сами приобрели его для украшения интерьера, позаботьтесь о состоянии растений. Магазинные цветы уже подготовлены к вазе: в нижней части стебля шипы и листья удалены, сам стебель аккуратно подрезан. Однако купленные растения часто обезвожены, поэтому им нужно помочь. Поместите букет под струю воды и обновите срезы на стеблях . Затем удалите нижние листья  и поставьте цветы в вазу с теплой водой. На растениях с мягким стеблем надо сделать длинный косой срез  — он увеличивает площадь поглощения влаги.
                            Следите за температурой в комнате. Букет необходимо поставить в светлое помещение, но не под прямые солнечные лучи. Избегайте сквозняков. Температура воздуха должна быть умеренной: при +18 °С срезанные растения стоят дольше, чем при +22 °С. Ночью лучше всего переставить вазу в прохладное место (идеальная температура — в пределах от +10 °С до +15 °С) или завернуть букет в бумагу и поместить в ведро с водой.
                            Периодически доливайте в вазу свежую воду. Это особенно важно в жаркое время года и в домах с низкой влажностью воздуха. Ведь там жидкость не только поглощается цветами, но и быстро испаряется.
                            Растения с длинными тычинками будут жить дольше, если эти тычинки удалить. Их можно вырвать руками или отрезать с помощью ножниц.
                            Чтобы продлить жизнь цветов, можно добавить в воду удобрения, дезинфицирующие средства, раствор аммония (все это продается в специализированных магазинах) или обычный сахар .
                            Опрыскивайте букет водой из пульверизатора , чтобы он дольше оставался ароматным и свежим.`
                        }</Text>
                        <Text>{
                            ` Некоторые растения имеют на стебле несколько соцветий. Такие букеты простоят дольше, если вы будете вовремя удалять засохшие цветки. Благодаря этому бутоны раскрываются полностью.
                            Существуют цветы, которые лучше не ставить вместе в одну вазу. Например, розы и гвоздики будут «конфликтовать» между собой и быстро завянут. Навредить другим растениям может и душистый горошек. Резеда, ландыши и нарциссы тоже ускорят увядание своих «соседей». А вот веточка ясменника, герани или туи, наоборот, продлит жизнь другим цветам в вазе.
                            Часто при оформлении букета флористы используют зелень и цветы кустарников. Уход за ними немного отличается от ухода за растениями с травянистым стеблем. Ветки больших кустарников имеют жесткий стебель, покрытый корой. Они могут быть уже обработаны, тогда их нужно просто поставить в вазу. Однако нередко такие ветки стоит самостоятельно подготовить к воде. Для этого надо отсечь нижние отростки  и подрезать стебель под косым углом. Снизу нужно сделать надрез и снять кору. Затем расщепить голый стебель на 2-3 части , взять молоток и раздробить приблизительно 2,5 см для увеличения площади впитывания .
                            Секреты ухода за разными растениями
                            При составлении букетов флористы используют многочисленные сорта цветов. Уход за ароматной композицией во многом зависит от вида растения. Расскажем о некоторых приемах.`
                        }</Text>
                        <div style={{height: 18}}></div>
                        <Text>{
                            `Самым популярным цветком для букетов является роза. Перед тем как поставить ее в вазу, необходимо срезать лишние листья и шипы . Стоит отметить, что у купленных роз они, как правило, уже удалены. Кроме того, есть сорта, у которых вообще нет шипов.`
                        }</Text>
                    </div>
            }
        ]
    }
]