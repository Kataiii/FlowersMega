import React, { useState } from "react";
import { Select, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useProductsSizesControllerGetAllQuery } from "../../../store/product";

const { Option } = Select;

const sizes = ["Малый", "Средний", "Большой", "Огромный", "Эксклюзивный"];

const TypeDropdown: React.FC = () => {
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
            style={{ width: 200 }}
            onSearch={handleSearch}
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
                            icon={<PlusOutlined />}
                            onClick={handleAddSize}
                        >
                            Добавить
                        </Button>
                    </div>
                    {menu}
                </>
            )}
        >
            {filteredItems.map((size) => (
                <Option key={size} value={size}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {size}
                        <Button
                            type="link"
                            danger
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveSize(size);
                            }}
                        >
                            X
                        </Button>
                    </div>
                </Option>
            ))}
        </Select>
    );
};

export default TypeDropdown;
