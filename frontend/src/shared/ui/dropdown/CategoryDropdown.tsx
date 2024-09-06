import React, { useState } from "react";
import { PlusOutlined, CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Modal, Upload } from "antd";

const categories = ["Съедобные букеты", "Орхидеи", "Розы", "Тюльпаны", "Гладиолусы"];

interface CategoryDropdownProps {
  value?: { name: string; photo: string }[];
  disabled?: boolean;
  onChange?: (value: { name: string; photo: string }[]) => void;
  style?: React.CSSProperties;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ disabled, value = [], onChange, style }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [items, setItems] = useState<string[]>(categories);
  const [selectedCategories, setSelectedCategories] = useState<{ name: string; photo: string }[]>(value);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [fileList, setFileList] = useState<any[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // const handleAddCategory = () => {
  //   if (newCategoryName && !items.includes(newCategoryName)) {
  //     setItems([...items, newCategoryName]);
  //     setNewCategoryName("");
  //     setFileList([]);
  //     setIsModalVisible(false);
  //   }
  // };
  const handleAddCategory = () => {
    if (newCategoryName && !items.includes(newCategoryName) && fileList.length > 0) {
      const newCategory = { name: newCategoryName, photo: URL.createObjectURL(fileList[0].originFileObj) };
      setItems([...items, newCategoryName]);
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

  const handleRemoveItem = (categoryToRemove: string) => {
    setItems([...items.filter((item) => item !== categoryToRemove)]);
  };

  // const handleRemoveCategory = (categoryToRemove: string) => {
  //   setSelectedCategories(selectedCategories.filter((item) => item !== categoryToRemove));
  // };
  const handleRemoveCategory = (categoryToRemove: string) => {
    const newSelectedCategories = selectedCategories.filter((item) => item.name !== categoryToRemove);
    setSelectedCategories(newSelectedCategories);
    if (onChange) {
      onChange(newSelectedCategories);
    }
  };

  // const handleSelectCategory = (value: string) => {
  //   if (!selectedCategories.includes(value)) {
  //     const newSelectedCategories = [...selectedCategories, value];
  //     setSelectedCategories(newSelectedCategories);
  //     if (onChange) {
  //       onChange(newSelectedCategories);
  //     }
  //   } else {
  //     const newSelectedCategories = selectedCategories.filter((item) => item !== value);
  //     setSelectedCategories(newSelectedCategories);
  //     if (onChange) {
  //       onChange(newSelectedCategories);
  //     }
  //   }
  // };


  const handleSelectCategory = (value: string) => {
    const existingCategory = selectedCategories.find((item) => item.name === value);
    if (!existingCategory) {
      const newCategory = { name: value, photo: "" };
      const newSelectedCategories = [...selectedCategories, newCategory];
      setSelectedCategories(newSelectedCategories);
      if (onChange) {
        onChange(newSelectedCategories);
      }
    } else {
      handleRemoveCategory(value);
    }
  };


  const filteredItems = items.filter((item) => item.toLowerCase().includes(searchValue.toLowerCase()));
  const handleUploadChange = (info: any) => {
    setFileList(info.fileList);
    if (onChange) onChange(fileList);
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
            <Button
              type="link"
              icon={<PlusOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                setIsModalVisible(true);
              }}
              style={{ marginBottom: "8px", color: "var(--primary-bg-color)" }}
            >
              Создать категорию
            </Button>
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
                  key={item}
                  style={{
                    display: "flex",
                    padding: "1px",
                    borderBottom: "1px solid #f0f0f0",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    onClick={() => handleSelectCategory(item)}
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      display: "flex",
                      width: "100%",
                      backgroundColor: selectedCategories.find((cat) => cat.name === item)
                        ? "var(--primary-bg-color)"
                        : item === hoveredItem
                          ? "var(--primary-bg-color-hover)"
                          : "transparent",
                      borderRight: "1px solid #f0f0f0",
                    }}
                  >
                    {item}
                  </div>
                  <CloseOutlined style={{ paddingLeft: "3px" }} onClick={() => handleRemoveItem(item)} />
                </div>
              ))}
            </div>
          </div>
        }
      >
        <Button type="primary">
          Добавить категорию {dropdownVisible ? <CloseOutlined /> : <PlusOutlined />}
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
            key={category.name}
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
              onClick={() => handleRemoveCategory(category.name)}
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
