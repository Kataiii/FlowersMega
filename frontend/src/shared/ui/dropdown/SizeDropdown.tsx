import React, { useEffect, useState } from "react";
import { Select, Input, Button } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Size, useSizesControllerDeleteMutation, useSizesControllerGetAllQuery, useSizesControllerGetByIdQuery } from "../../../store/size";

const { Option } = Select;

interface SizeDropdownProps {
    onChange?: (value: number | undefined) => void;
    value?: number | undefined;
    style?: React.CSSProperties;
    disabled?: boolean;
}

const SizeDropdown: React.FC<SizeDropdownProps> = ({ onChange, value, disabled }) => {
    const { data: sizeData } = useSizesControllerGetAllQuery();
    const { data: infoSize } = useSizesControllerGetByIdQuery({ id: value ? value : 1 });
    const [searchValue, setSearchValue] = useState<string>("");
    const [items, setItems] = useState<Size[]>([]);
    const [deleteSize] = useSizesControllerDeleteMutation();

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

    const handleRemoveSize = async (sizeToRemove: number) => {
        try {
            await deleteSize({ id: sizeToRemove }).unwrap();
            console.log(`Фильтр с id ${sizeToRemove} успешно удален.`);
        } catch (error) {
            console.error('Ошибка при удалении фильтра:', error);
        }
    };

    const filteredItems = items.filter((size) =>
        size.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <Select
            showSearch
            placeholder="Выберите размер"
            value={infoSize?.name}
            disabled={disabled}
            style={{ width: 200 }}
            onSearch={handleSearch}
            onChange={(value) => onChange && onChange(Number(value))}
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
                        {value !== size.id && (
                            <Button
                                type="link"
                                danger
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveSize(size.id!);
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

export default SizeDropdown;
