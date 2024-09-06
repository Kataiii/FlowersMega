import React, { useState } from "react";
import { Select, Input, Button } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useProductsSizesControllerGetAllQuery } from "../../../store/product";

const { Option } = Select;

const sizes = ["Малый", "Средний", "Большой", "Огромный", "Эксклюзивный"];

interface TypeDropdownProps {
    onChange?: (value: string) => void;
    value?: string;
    style?: React.CSSProperties;
}

const TypeDropdown: React.FC<TypeDropdownProps> = ({ onChange, value }) => {
    const { isLoading, data } = useProductsSizesControllerGetAllQuery();
    const [searchValue, setSearchValue] = useState<string>("");
    const [items, setItems] = useState<string[]>(sizes);

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };

    const handleAddSize = () => {
        if (searchValue && !items.includes(searchValue)) {
            setItems([...items, searchValue]);
            setSearchValue("");
        }
    };

    const handleRemoveSize = (sizeToRemove: string) => {
        setItems(items.filter((item) => item !== sizeToRemove));
    };

    const filteredItems = items.filter((size) =>
        size.toLowerCase().includes(searchValue.toLowerCase())
    );


    return (
        <Select
            showSearch
            allowClear
            placeholder="Выберите размер"
            value={value}
            style={{ width: 200 }}
            onSearch={handleSearch}
            onChange={onChange}
            dropdownRender={(menu) => (
                <>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 8 }}>
                        <Input
                            placeholder="Поиск..."
                            value={searchValue}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <Button
                            type="text"
                            onClick={handleAddSize}
                            style={
                                {
                                    margin: "5px 0",
                                    color: "var(--primary-bg-color)"
                                }
                            }
                        >
                            Добавить <PlusOutlined />
                        </Button>
                    </div>
                    {menu}
                </>
            )}
        >
            {filteredItems.map((size) => (
                <Option key={size} value={size}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {size}
                        <Button
                            type="link"
                            danger
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveSize(size);
                            }}
                        >
                            <CloseOutlined />
                        </Button>
                    </div>
                </Option>
            ))}
        </Select>
    );
};

export default TypeDropdown;
