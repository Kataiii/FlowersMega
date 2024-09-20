import { useEffect, useState } from "react";
import { TypeProduct, useTypesProductControllerGetAllQuery } from "../../../store/typeProduct";
import { Select } from "antd";


interface SizeDropdownProps {
    onChange?: (value: string) => void;
    value?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
}
const { Option } = Select;

const TypeDropdown: React.FC<SizeDropdownProps> = ({ onChange, value, disabled }) => {
    const { data: typeData } = useTypesProductControllerGetAllQuery();
    const [items, setItems] = useState<TypeProduct[]>([]);

    useEffect(() => {
        if (typeData) {
            setItems(typeData);
        }
    }, [typeData]);

    return (
        <Select
            placeholder="Выберите тип"
            value={value}
            disabled={disabled}
            style={{ width: 140 }}
            onChange={onChange}
            dropdownRender={(menu) => {
                return (
                    <>
                        {menu}
                    </>
                )
            }
            }

        >
            {items.map((item) => (
                <Option key={item.id} value={item.id}>
                    {item.name}
                </Option>
            ))}
        </Select>
    )

}

export default TypeDropdown;