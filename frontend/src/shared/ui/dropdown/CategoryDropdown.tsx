import React, { useState, useEffect } from "react";
import { PlusOutlined, CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Modal, Upload } from "antd";
import { ItemFilter } from "../../../store/product";
import { ButtonText } from "../../../pages/admin/ui/products/Products";

interface CategoryDropdownProps {
  value?: { id?: number; name: string; photo: string }[];
  disabled?: boolean;
  onChange?: (value: { id?: number; name: string; photo: string }[]) => void;
  style?: React.CSSProperties;
  name?: string;
  data?: (Category | ItemFilter)[];
  showAddButton?: boolean;
}

export type Category = {
  id?: number;
  name: string;
  url?: string;
};

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  showAddButton = false,
  data = [],
  name,
  disabled,
  value = [],
  onChange,
  style,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [items, setItems] = useState<{ id?: number; name: string }[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<{ id?: number; name: string; photo: string }[]>(value);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [fileList, setFileList] = useState<any[]>([]);

  const formattedItems = data.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  useEffect(() => {
    setItems(formattedItems);
  }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleAddCategory = () => {
    if (newCategoryName && !items.some(item => item.name === newCategoryName) && fileList.length > 0) {
      const newCategory = { name: newCategoryName, photo: URL.createObjectURL(fileList[0].originFileObj) };
      const newSelectedCategories = [...selectedCategories, newCategory];
      setSelectedCategories(newSelectedCategories);
      if (onChange) {
        onChange(newSelectedCategories);
      }
      setNewCategoryName("");
      setFileList([]);
      setIsModalVisible(false);
    }
  };

  const handleRemoveItem = (categoryId: number) => {
    setItems(items.filter((item) => item.id !== categoryId));
  };

  const handleRemoveCategory = (categoryId: number) => {
    const newSelectedCategories = selectedCategories.filter((item) => item.id !== categoryId);
    setSelectedCategories(newSelectedCategories);
    if (onChange) {
      onChange(newSelectedCategories);
    }
  };

  const handleSelectCategory = (category: Category) => {
    const existingCategory = selectedCategories.find((item) => item.id === category.id);
    if (!existingCategory) {
      const newCategory = { id: category.id, name: category.name, photo: category.url || "" };
      const newSelectedCategories = [...selectedCategories, newCategory];
      setSelectedCategories(newSelectedCategories);
      if (onChange) {
        onChange(newSelectedCategories);
      }
    } else {
      handleRemoveCategory(category.id!);
    }
  };

  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));

  const handleUploadChange = (info: any) => {
    setFileList(info.fileList);
  };

  return (
    <div style={{ display: "flex", alignItems: "start" }}>
      <Dropdown
        disabled={disabled}
        trigger={["click"]}
        open={dropdownVisible}
        onOpenChange={(open) => setDropdownVisible(open)}
        overlay={
          <div
            style={{
              display: "flex",
              overflow: "hidden",
              flexDirection: "column",
              margin: "2px 0",
              padding: "8px",
              backgroundColor: "var(--block-bg-color)",
              border: "1px solid var(--primary-bg-color)",
              borderRadius: "8px",
              width: "250px",
            }}
          >
            <Input
              placeholder="Поиск..."
              value={searchValue}
              onChange={handleSearch}
              style={{ marginBottom: "8px", width: "234px" }}
              onClick={(e) => e.stopPropagation()}
            />
            {showAddButton && (
              <Button
                type="link"
                icon={<PlusOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalVisible(true);
                  setDropdownVisible(false);
                }}
                style={{ marginBottom: "8px", color: "var(--primary-bg-color)" }}
              >
                Создать категорию
              </Button>
            )}
            <div
              style={{
                width: "234px",
                maxHeight: "200px",
                overflowY: "auto",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                padding: "4px",
                scrollbarColor: "var(--primary-bg-color) var(--block-bg-color)",
                scrollbarWidth: "thin",
              }}
            >
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    padding: "1px",
                    borderBottom: "1px solid #f0f0f0",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    onClick={() => handleSelectCategory(item)}
                    onMouseEnter={() => setHoveredItem(item.id!)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      display: "flex",
                      width: "100%",
                      backgroundColor: selectedCategories.find((cat) => cat.id === item.id)
                        ? "var(--primary-bg-color)"
                        : item.id === hoveredItem
                          ? "var(--primary-bg-color-hover)"
                          : "transparent",
                      borderRight: "1px solid #f0f0f0",
                    }}
                  >
                    {item.name}
                  </div>
                  <CloseOutlined style={{ paddingLeft: "3px" }} onClick={() => handleRemoveItem(item.id!)} />
                </div>
              ))}
            </div>
          </div>
        }
      >
        <Button type="primary">
          {<ButtonText style={{ display: "inline" }}>{name}</ButtonText>} {dropdownVisible ? <CloseOutlined /> : <PlusOutlined />}
        </Button>
      </Dropdown>

      <div
        style={{
          marginLeft: "10px",
          display: "flex",
          flexWrap: "nowrap",
          gap: "5px",
          maxHeight: "150px",
          overflowX: "auto",
          overflowY: "hidden",
          paddingBottom: "4px",
          scrollbarWidth: "thin",
          scrollbarColor: "var(--primary-bg-color) var(--block-bg-color)",
          paddingTop: "3px",
        }}
      >
        {selectedCategories.map((category) => (
          <div
            key={category.id}
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
            {category.name}
            <CloseOutlined
              onClick={() => handleRemoveCategory(category.id!)}
              style={{ marginLeft: "8px", cursor: "pointer" }}
            />
          </div>
        ))}
      </div>

      <Modal
        title="Создать категорию"
        visible={isModalVisible}
        onOk={handleAddCategory}
        onCancel={() => setIsModalVisible(false)}
        okText="Создать"
        cancelText="Отмена"
      >
        <Input
          placeholder="Название категории"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          style={{ marginBottom: "8px" }}
        />
        <Upload
          fileList={fileList}
          beforeUpload={() => false}
          onChange={handleUploadChange}
          listType="picture"
        >
          <Button icon={<UploadOutlined />}>Загрузить фото</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default CategoryDropdown;