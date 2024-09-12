import React, { useEffect, useState } from "react";
import { Select, Input, Button } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Size, useSizesControllerGetAllQuery } from "../../../store/size";

const { Option } = Select;

interface TypeDropdownProps {
    onChange?: (value: string) => void;
    value?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
}

const TypeDropdown: React.FC<TypeDropdownProps> = ({ onChange, value, disabled }) => {
    const { data: sizeData } = useSizesControllerGetAllQuery();
    const [searchValue, setSearchValue] = useState<string>("");
    const [items, setItems] = useState<Size[]>([]);

    useEffect(() => {
        if (sizeData) {
            setItems(sizeData);
        }
    }, [sizeData]);

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };

    const handleAddSize = () => {
        if (searchValue && !items.some(size => size.name === searchValue)) {
            setItems([...items, { name: searchValue }]);
            setSearchValue("");
        }
    };

    const handleRemoveSize = (sizeToRemove: Size) => {
        setItems(items.filter((item) => item.name !== sizeToRemove.name));
    };

    const filteredItems = items.filter((size) =>
        size.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <Select
            showSearch
            placeholder="Выберите размер"
            value={value}
            disabled={disabled}
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
                            style={{
                                margin: "5px 0",
                                color: "var(--primary-bg-color)"
                            }}
                        >
                            Добавить <PlusOutlined />
                        </Button>
                    </div>
                    {menu}
                </>
            )}
        >
            {filteredItems.map((size) => (
                <Option key={size.id} value={size.id?.toString()}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {size.name}
                        {value !== size.id?.toString() && (
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
                        )}
                    </div>
                </Option>
            ))}
        </Select>
    );
};

export default TypeDropdown;
