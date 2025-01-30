import { useCallback, useEffect, useState } from "react";
import CategoryDropdown from "../../shared/ui/dropdown/CategoryDropdown";
import { useCategoriesControllerGetAllQuery, useCategoriesControllerGetByIdQuery } from "../../store/category";
import { Button, Input, InputNumber, Spin } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useExtraPriceControllerCreateMutation, useExtraPriceControllerDeleteMutation } from "../../store/extrPrice";
import { Debouncer } from "../../shared/utils/debounce";

interface ExtraPriceVarProps {
    value: any;
    onChange: (updatedVariation: any) => void;
    onRemove: () => void;
}

type ValueType = string | number | null;

const ExtraPriceVar: React.FC<ExtraPriceVarProps> = ({ value, onChange, onRemove }) => {
    const { data: categories } = useCategoriesControllerGetAllQuery();
    const { data: category, isLoading: isCategoryLoading } = useCategoriesControllerGetByIdQuery(
        { id: Number(value.idCategory) }
    );
    const [selectedCategories, setSelectedCategories] = useState<{ id: number, name: string; photo: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteExtra] = useExtraPriceControllerDeleteMutation();
    const [createExtra] = useExtraPriceControllerCreateMutation();
    const [extraValue, setExtraValue] = useState<number>(value.value);
    const debouncer = new Debouncer();

    const debounceCreation = useCallback(
        debouncer.debounce((newCost: number) => {
            const categoryId = selectedCategories[0]?.id?.toString();
            if (!categoryId) {
                console.error("Категория не выбрана");
                return;
            }
            createExtra({ body: { idCategory: categoryId, value: newCost } });
        }, 1000), [selectedCategories]
    );

    const handleApply = () => {
        if (!selectedCategories[0]?.id) {
            console.error("Категория не выбрана");
            return;
        }
        debounceCreation(extraValue);
    };

    useEffect(() => {
        if (!isCategoryLoading) {
            if (category) {
                setSelectedCategories([{ id: category.id || 0, name: category.name || '', photo: category.url || '' }]);
            }
            setIsLoading(false);
        }
    }, [category, isCategoryLoading,]);

    const handleCostChange = (newCost: ValueType | null) => {
        if (newCost !== null) {
            const newValue = Number(newCost);
            setExtraValue(newValue);
        }
    }

    const handleCategoryChange = (newCategories: { id?: number, name: string; photo: string }[]) => {
        const validCategories = newCategories.map(category => ({
            id: category.id || 0,
            name: category.name,
            photo: category.photo
        }));

        setSelectedCategories(validCategories);
        onChange({ ...value, categories: validCategories });
    };

    const handleDelete = async () => {
        try {
            if (!value.idCategory) {
                throw new Error('idCategory is missing');
            }
            await deleteExtra({ idCategory: value.idCategory });
            onRemove();
        } catch (e) {
            console.error('Error during deletion:', e);
        }
    };
    return (
        <>
            {
                isLoading ? (
                    <Spin />
                ) : (
                    <div
                        style={{
                            border: "1px solid var(--primary-bg-color)",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            borderRadius: "4px",
                            gap: "3px",
                            padding: "0 5px",
                            backgroundColor: "var(--block-bg-color)",
                            marginBottom: "5px",
                        }}
                    >
                        <div
                            style={{
                                width: "760px",
                                height: "45px",
                                borderRadius: "8px",
                                marginTop: "10px",
                                alignItems: "center",
                                padding: "2.5px",
                                maxHeight: "150px",
                            }}
                        >
                            <CategoryDropdown
                                value={selectedCategories}
                                onChange={handleCategoryChange}
                                name="Категории"
                                showAddButton={true}
                                data={categories}
                                isHasVariants={true}
                            />
                        </div>
                        <div
                            style={{ margin: "5px", width: "15%", display: "flex", alignItems: "center", gap: "10px", minWidth: "5%" }}
                        >
                            <InputNumber
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                onChange={handleCostChange}
                                value={extraValue}
                                style={{ minWidth: "5%" }}
                            />
                            <div style={{ color: "var(--primary-bg-color)", fontWeight: "600", fontSize: "20px" }}>
                                %
                            </div>
                        </div>

                        <Button type="primary" style={{ fontFamily: "Inter", marginLeft: "25%", fontSize: "16px" }} onClick={handleApply}>Применить</Button>
                        <div
                            style={{
                                width: "33px",
                                height: "33px",
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "var(--primary-bg-color)",
                                borderRadius: "8px",
                                padding: "9px",
                                cursor: "pointer",
                            }}
                            onClick={() => { handleDelete() }}
                        >
                            <CloseOutlined />
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default ExtraPriceVar;
