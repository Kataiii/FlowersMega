import { Button, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import ExtraPriceVar from "./ExtraPriceVar";
import { ButtonText } from "../../pages/admin/ui/products/Products";

const ExtraPriceBlock: React.FC = () => {
    const [variations, setVariations] = useState<any[]>([]);

    const handleAddVariation = () => {
        const newVariation = {};
        const updatedVariations = [...variations, newVariation];
        setVariations(updatedVariations);
    };

    const handleChangeVariation = (index: number, updatedVariation: any) => {
        const updatedVariations = variations.map((v, i) =>
            i === index ? updatedVariation : v
        );
        setVariations(updatedVariations);
    };

    const handleRemoveVariation = (index: number) => {
        const updatedVariations = variations.filter((_, i) => i !== index);
        setVariations(updatedVariations);
    };

    return (
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
                <div style={{ backgroundColor: "var(--city-active)", borderRadius: "16px", height: "182px", display: "flex", flexDirection: "column", width: "70%", gap: "10px" }}>

                    <div>
                        <Button
                            style={{ width: "100%" }}
                            type="primary"
                            shape="round"
                            onClick={handleAddVariation}
                        >
                            Добавить наценку <PlusCircleOutlined />
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
                                key={index}
                                value={variation}
                                onChange={(updatedVariation) =>
                                    handleChangeVariation(index, updatedVariation)
                                }
                                onRemove={() => handleRemoveVariation(index)}
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
                        padding: "6px",
                        borderRadius: "10px",
                        height: "182px"
                    }}
                >
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "space-between " }}>
                        <p style={{ color: "var(--primary-bg-color)", fontSize: "16px", fontFamily: "Inter", fontWeight: "600", }}>
                            Общая наценка
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <Input style={{ width: "250px" }} />
                            <div style={{ color: "var(--primary-bg-color)", fontWeight: "600", fontSize: "20px" }}>
                                ₽
                            </div>
                        </div>

                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p>
                            Всего
                        </p>
                        <span>ahhaha</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p>
                            С наценкой
                        </p>
                        <span>ahhaha</span>
                    </div>
                    <Button danger>
                        <ButtonText>Сбросить</ButtonText>
                    </Button>
                    <Button type="primary">
                        <ButtonText>Применить</ButtonText>
                    </Button>
                </div>
            </div>
        </div >
    );
};

export default ExtraPriceBlock;
