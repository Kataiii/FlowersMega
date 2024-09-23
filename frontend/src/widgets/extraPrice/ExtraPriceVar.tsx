import { useState } from "react";
import CategoryDropdown from "../../shared/ui/dropdown/CategoryDropdown";
import { useCategoriesControllerGetAllQuery } from "../../store/category";
import { Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface ExtraPriceVarProps {
    value: any;
    onChange: (updatedVariation: any) => void;
    onRemove: () => void;
}

const ExtraPriceVar: React.FC<ExtraPriceVarProps> = ({ value, onChange, onRemove }) => {
    const [selectedCategories, setSelectedCategories] = useState<{ name: string; photo: string }[]>([]);
    const { data: categories } = useCategoriesControllerGetAllQuery();

    const handleCategoryChange = (newCategories: { name: string; photo: string }[]) => {
        setSelectedCategories(newCategories);
        onChange({ ...value, categories: newCategories });
    };

    return (
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
                />
            </div>
            <div
                style={{ margin: "5px", width: "15%", display: "flex", alignItems: "center", gap: "10px" }}
            >
                <Input
                    onChange={(e) => onChange({ ...value, price: e.target.value })}
                    value={value.price || ""}
                />
                <div style={{ color: "var(--primary-bg-color)", fontWeight: "600", fontSize: "20px" }}>
                    %
                </div>
            </div>
            <div
                style={{
                    width: "33px",
                    height: "33px",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "var(--primary-bg-color)",
                    borderRadius: "8px",
                    padding: "9px",
                    marginLeft: "65px",
                    cursor: "pointer",
                }}
                onClick={onRemove}
            >
                <CloseOutlined />
            </div>
        </div>
    );
};

export default ExtraPriceVar;
