import { Button, Input, InputNumber, Spin } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import ExtraPriceVar from "./ExtraPriceVar";
import { ButtonText } from "../../pages/admin/ui/products/Products";
import { useExtraPriceControllerCreateMutation, useExtraPriceControllerDeleteMutation, useExtraPriceControllerGetAllQuery, useExtraPriveControllerGetByCategoryIdQuery } from "../../store/extrPrice";
import { useCategoriesControllerGetByIdQuery } from "../../store/category";
import { Debouncer } from "../../shared/utils/debounce";

interface ExtraPriveVar {
    id: number;
    idCategory: string;
    value: number;
}

type ValueType = string | number | null;

const ExtraPriceBlock: React.FC = () => {
    const { data: extraItems, isLoading: isExtraLoading } = useExtraPriceControllerGetAllQuery();
    const { data: extraPriceToAll, isLoading: isExtraPriceToAllLoading } = useExtraPriveControllerGetByCategoryIdQuery({ idCategory: 'all' });
    const [deleteExtra] = useExtraPriceControllerDeleteMutation();
    const [createExtra] = useExtraPriceControllerCreateMutation();
    const [extraValue, setExtraValue] = useState<number>(extraPriceToAll?.value ? extraPriceToAll?.value : 0);
    const [variations, setVariations] = useState<any[]>(extraItems || []);
    // console.log(extraItems, "EXTRA")
    // console.log(variations, "DADADADADADADADA")
    console.log(extraPriceToAll, "EXTRA VAL")
    const debouncer = new Debouncer();
    useEffect(() => {
        if (!isExtraLoading && extraItems) {
            const filteredItems = extraItems.filter(item => item.idCategory !== 'all');

            setVariations(filteredItems);
            setExtraValue(extraPriceToAll?.value ? extraPriceToAll?.value : 0);
        }
    }, [extraItems, isExtraLoading, extraPriceToAll]);

    const debounceCreation = useCallback(
        debouncer.debounce((newCost: number) => {
            createExtra({ body: { idCategory: 'all', value: newCost } });
        }, 1000), []
    );

    const handleApply = () => {
        debounceCreation(extraValue);
    };

    const handleAddVariation = () => {
        const newVariation: ExtraPriveVar = {
            id: 0,
            idCategory: 'New Category',
            value: 0
        };
        setVariations(prevVariations => [...prevVariations, newVariation]);
    };

    const handleDelete = async () => {
        try {
            await createExtra({ body: { idCategory: 'all', value: 0 } });
        } catch (e) {
            console.error('Error during deletion:', e);
        }
    };

    const handleChangeVariation = (index: number, updatedVariation: any) => {
        const updatedVariations = variations.map((v, i) =>
            i === index ? updatedVariation : v
        );
        setVariations(updatedVariations);
    };

    const handleRemoveVariation = (id: number) => {
        const updatedVariations = variations.filter((variation) => variation.id !== id);
        setVariations(updatedVariations);
    };

    const handleCostChange = (newCost: ValueType | null) => {
        if (newCost !== null) {
            const newValue = Number(newCost);
            setExtraValue(newValue);
        }
    }

    return (
        <>
            {
                isExtraLoading ? (<Spin />) : (
                    <div style={{ borderRadius: "16px" }}>
                        <div
                            style={{

                                width: "100%",
                                height: "200px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "start",
                                border: "1px solid var(--primary-bg-color)",
                                padding: "12px",
                                borderRadius: "16px",
                                gap: "20px"
                            }}
                        >
                            <div style={{ backgroundColor: "var(--city-active)", borderRadius: "16px", height: "182px", display: "flex", flexDirection: "column", width: "70%", gap: "10px", padding: "3px", }}>

                                <div>
                                    <Button
                                        style={{ width: "100%" }}
                                        type="primary"
                                        shape="round"
                                        onClick={handleAddVariation}
                                    >
                                        <ButtonText style={{ display: "inline" }}>Добавить наценку</ButtonText> <PlusCircleOutlined />
                                    </Button>
                                </div>
                                <div
                                    style={{
                                        width: "100%",
                                        maxHeight: "140px",

                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: "2px",

                                        // overflowX: "hidden",
                                        overflowY: "auto",
                                        gap: "5px",
                                        scrollbarColor: "var(--primary-bg-color) var(--city-active)",
                                        scrollbarWidth: "thin",
                                    }}
                                >
                                    {variations.map((variation, index) => (
                                        <ExtraPriceVar
                                            key={variation.id}
                                            value={variation}
                                            onChange={(updatedVariation) => handleChangeVariation(index, updatedVariation)}
                                            onRemove={() => handleRemoveVariation(variation.id)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "30%",
                                    gap: "9px",
                                    border: "1px solid var(--primary-bg-color)",
                                    backgroundColor: "var(--city-active)",
                                    padding: "6px",
                                    borderRadius: "10px",
                                    height: "182px"
                                }}
                            >
                                <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "space-between " }}>
                                    <p style={{ color: "var(--extra-price-all)", fontSize: "16px", fontFamily: "Inter", fontWeight: "600", }}>
                                        Общая наценка
                                    </p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <InputNumber
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            style={{ width: "90%" }}
                                            value={extraValue}
                                            onChange={handleCostChange}
                                        />
                                        <div style={{ color: "var(--extra-price-all)", fontWeight: "600", fontSize: "20px" }}>
                                            %
                                        </div>
                                    </div>

                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <p style={{ color: "var(--extra-pice)", fontSize: "16px", fontFamily: "Inter", fontWeight: "600", }}>
                                        Всего
                                    </p>
                                    <span style={{ color: "var(--extra-pice", fontSize: "16px", fontFamily: "Inter", fontWeight: "600", }}>0</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <p style={{ color: "var(--extra-pice)", fontSize: "16px", fontFamily: "Inter", fontWeight: "600", }}>
                                        С наценкой
                                    </p>
                                    <span style={{ color: "var(--extra-pice)", fontSize: "16px", fontFamily: "Inter", fontWeight: "600", }}>0</span>
                                </div>
                                <Button danger type="primary" shape="round" onClick={handleDelete}>
                                    <ButtonText>Сбросить</ButtonText>
                                </Button>
                                <Button type="primary" shape="round" onClick={handleApply}>
                                    <ButtonText>Применить</ButtonText>
                                </Button>
                            </div>
                        </div>
                    </div >
                )
            }
        </>

    );
};

export default ExtraPriceBlock;
