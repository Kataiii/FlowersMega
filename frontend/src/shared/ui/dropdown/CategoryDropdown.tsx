import React, { useState } from "react";
import { DownOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Select } from "antd";

const { Option } = Select;

const categories = ["Съедобные букеты", "Орхидеи", "Розы", "Тюльпаны", "Гладиолусы"];

const CategoryDropdown: React.FC = (props: any) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [items, setItems] = useState<string[]>(categories);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleAddCategory = () => {
    if (searchValue && !items.includes(searchValue)) {
      setItems([...items, searchValue]);
      setSearchValue("");
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    setSelectedCategories(selectedCategories.filter((item) => item !== categoryToRemove));
  };

  const handleSelectCategory = (value: string) => {
    if (!selectedCategories.includes(value)) {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const filteredItems = items.filter((size) => size.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div style={{ display: "flex", alignItems: "start" }}>
      <Dropdown
        disabled={props.disabled}
        trigger={["click"]}
        open={dropdownVisible}
        onOpenChange={(e) => setDropdownVisible(e)}
        overlay={
          <div style={{ display: "flex", overflow: "auto", flexDirection: "column", margin: "2px 0", padding: "8px", backgroundColor: "var(--block-bg-color)", border: "1px solid var(--primary-bg-color)", borderRadius: "8px" }}>
            <Input
              placeholder="Поиск..."
              value={searchValue}
              onChange={handleSearch}
              style={{ marginBottom: "8px", width: "165px" }}
              onClick={(e) => e.stopPropagation()}
            />
            <Button
              type="link"
              icon={<PlusOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                handleAddCategory();
              }}
              style={{ marginBottom: "8px", color: "var(--primary-bg-color)" }}
            >
              Создать категорию
            </Button>
            <Select
              style={{ width: "165px" }}
              onSelect={handleSelectCategory}
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  {filteredItems.map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </div>
              )}
            >
              {filteredItems.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>
        }
      >
        <Button>
          Добавить категорию <PlusOutlined />
        </Button>
      </Dropdown>

      <div style={
        {
          marginLeft: "10px",
          display: "flex",
          flexWrap: "nowrap",
          gap: "5px",
          maxHeight: "150px",
          overflowX: "auto",
          overflowY: "hidden",
          paddingBottom: "4px",
          scrollbarWidth: "thin",
          scrollbarColor: "var(--primary-bg-color) var(--block-bg-color)"

        }}>
        {selectedCategories.map((category) => (
          <div
            key={category}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "4px 8px",
              border: "1px solid var(--primary-bg-color)",
              borderRadius: "4px",
              background: "var(--primary-bg-color)",
              color: "#fff",
              whiteSpace: "nowrap",

            }}
          >
            {category}
            <CloseOutlined
              onClick={() => handleRemoveCategory(category)}
              style={{ marginLeft: "8px", cursor: "pointer" }}
            />
          </div>
        ))}

      </div>
    </div>
  );
};

export default CategoryDropdown;
