import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState, useEffect } from "react";
import Variation from "./Variation";
import { ButtonText } from "../../../pages/admin/ui/products/Products";

interface Props {
    onVariationsChange: (variations: any[]) => void,
    disabled?: boolean
    value?: any[];
}

const VariationsBlock: React.FC<Props> = ({ onVariationsChange, disabled, value = [] }) => {

    const [variations, setVariations] = useState<any[]>([]);

    useEffect(() => {
        setVariations(value);
    }, [value])

    // useEffect(() => {
    //     onVariationsChange(variations);
    // }, [variations]);

    const handleAddVariation = () => {
        const newVariation = {};
        const updatedVariations = [...variations, newVariation];
        setVariations(updatedVariations);
        onVariationsChange(updatedVariations);
    };

    const handleChangeVariation = (index: number, updatedVariation: any) => {
        const updatedVariations = variations.map((v, i) =>
            i === index ? updatedVariation : v
        );
        setVariations(updatedVariations);
        onVariationsChange(updatedVariations);
    };

    const handleRemoveVariation = (index: number) => {
        const updatedVariations = variations.filter((_, i) => i !== index);
        setVariations(updatedVariations);
        onVariationsChange(updatedVariations);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ height: "190px", overflowX: "hidden", overflowY: "auto", marginBottom: "10px", scrollbarWidth: "thin", scrollbarColor: "var(--primary-bg-color) var(--block-bg-color)" }}>
                {variations.map((variation, index) => (
                    <Variation
                        key={index}
                        disabled={disabled}
                        variation={variation}
                        onChange={(updatedVariation) => handleChangeVariation(index, updatedVariation)}
                        onRemove={() => handleRemoveVariation(index)}
                    />
                ))}
            </div>
            <Button disabled={disabled} onClick={handleAddVariation} style={{ margin: 0 }}>
                <ButtonText>Добавить вариацию <PlusCircleOutlined style={{ color: "var(--primary-bg)" }} /></ButtonText>
            </Button>
        </div>
    );
};

export default VariationsBlock;
