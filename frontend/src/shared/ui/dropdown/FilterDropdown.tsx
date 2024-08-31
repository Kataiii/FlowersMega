import React, { useState } from 'react';
import { Dropdown, Button, Input, Menu, Checkbox } from 'antd';
import { PlusOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';

interface FilterTag {
    filter: string;
    tags: string[];
}

const FilterComponent: React.FC = () => {
    const [filters, setFilters] = useState<FilterTag[]>([]);
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [availableFilters, setAvailableFilters] = useState<string[]>(['Цветы', 'Стиль', 'Кому', 'Повод']);
    const [tagOptions, setTagOptions] = useState<{ [key: string]: string[] }>({
        'Кому': ['Маме', 'Девушке', 'Сестре', 'Подруге', 'Учительнице']
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleAddFilter = () => {
        if (searchValue && !availableFilters.includes(searchValue)) {
            setAvailableFilters([...availableFilters, searchValue]);
            setSearchValue('');
        }
    };

    const handleSelectFilter = (filter: string) => {
        setActiveFilter(filter);
        setSearchValue('');
    };

    const handleTagChange = (checked: boolean, tag: string) => {
        if (activeFilter) {
            const filterIndex = filters.findIndex(f => f.filter === activeFilter);
            if (filterIndex !== -1) {
                const updatedFilters = [...filters];
                if (checked) {
                    updatedFilters[filterIndex].tags.push(tag);
                } else {
                    updatedFilters[filterIndex].tags = updatedFilters[filterIndex].tags.filter(t => t !== tag);
                }
                setFilters(updatedFilters);
            } else if (checked) {
                setFilters([...filters, { filter: activeFilter, tags: [tag] }]);
            }
        }
    };

    const handleRemoveFilter = (filter: string) => {
        setFilters(filters.filter(f => f.filter !== filter));
        if (filter === activeFilter) {
            setActiveFilter(null);
        }
    };

    const handleCloseMenu = () => {
        if (activeFilter) {
            setActiveFilter(null);
        } else {
            setDropdownOpen(false);
        }
    };

    const handleAddTag = () => {
        if (activeFilter && searchValue && !tagOptions[activeFilter]?.includes(searchValue)) {
            setTagOptions({
                ...tagOptions,
                [activeFilter]: [...(tagOptions[activeFilter] || []), searchValue]
            });
            setSearchValue('');
        }
    };

    const filteredAvailableFilters = availableFilters.filter((filter) =>
        filter.toLowerCase().includes(searchValue.toLowerCase())
    );

    const filteredTags = activeFilter && tagOptions[activeFilter]
        ? tagOptions[activeFilter].filter((tag) => tag.toLowerCase().includes(searchValue.toLowerCase()))
        : [];

    const mainMenu = (
        <div style={{ padding: "8px", backgroundColor: "#fff", border: "1px solid #d9d9d9", borderRadius: "8px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Input
                    placeholder="Поиск..."
                    value={searchValue}
                    onChange={handleSearch}
                    style={{ width: "135px" }}
                    onClick={(e) => e.stopPropagation()}
                />
                <Button
                    type="link"
                    icon={<CloseOutlined />}
                    onClick={handleCloseMenu}
                    style={{ color: "#ff4d4f" }}
                />
            </div>
            <Button
                type="link"
                icon={<PlusOutlined />}
                onClick={(e) => {
                    e.stopPropagation();
                    handleAddFilter();
                }}
                style={{ marginBottom: "8px", color: "#ff4d4f" }}
            >
                Создать категорию
            </Button>
            <Menu
                items={filteredAvailableFilters.map(filter => ({
                    key: filter,
                    label: filter,
                    onClick: () => handleSelectFilter(filter)
                }))}
            />
        </div>
    );

    const tagMenu = activeFilter && (
        <div style={{ padding: "8px", backgroundColor: "#fff", border: "1px solid #d9d9d9", borderRadius: "8px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Input
                    placeholder="Поиск тегов..."
                    value={searchValue}
                    onChange={handleSearch}
                    style={{ width: "135px" }}
                    onClick={(e) => e.stopPropagation()}
                />
                <Button
                    type="link"
                    icon={<PlusOutlined />}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAddTag();
                    }}
                    style={{ marginLeft: '8px', color: "#ff4d4f" }}
                >
                    Добавить тег
                </Button>
                <Button
                    type="link"
                    icon={<CloseOutlined />}
                    onClick={handleCloseMenu}
                    style={{ color: "#ff4d4f" }}
                />
            </div>
            <Menu
                items={filteredTags.map(tag => ({
                    key: tag,
                    label: (
                        <Checkbox
                            checked={filters.find(f => f.filter === activeFilter)?.tags.includes(tag) || false}
                            onChange={(e) => handleTagChange(e.target.checked, tag)}
                        >
                            {tag}
                        </Checkbox>
                    )
                }))}
            />
        </div>
    );

    return (
        <div style={{ display: "flex", alignItems: "start" }}>
            <Dropdown
                menu={{
                    items: activeFilter ? filteredTags.map(tag => ({
                        key: tag,
                        label: (
                            <Checkbox
                                checked={filters.find(f => f.filter === activeFilter)?.tags.includes(tag) || false}
                                onChange={(e) => handleTagChange(e.target.checked, tag)}
                            >
                                {tag}
                            </Checkbox>
                        )
                    })) : filteredAvailableFilters.map(filter => ({
                        key: filter,
                        label: filter,
                        onClick: () => handleSelectFilter(filter)
                    }))
                }}
                trigger={['click']}
                open={dropdownOpen || !!activeFilter}
                onOpenChange={(flag) => setDropdownOpen(flag)}
                dropdownRender={menu => activeFilter ? tagMenu : mainMenu}
            >
                <Button icon={<PlusOutlined />} onClick={() => setDropdownOpen(!dropdownOpen)}>
                    Добавить фильтр
                </Button>
            </Dropdown>

            <div style={{ marginLeft: '10px', display: "flex", flexDirection: "row", gap: "8px", overflowX: "auto", overflowY: "hidden", scrollbarWidth: "thin", scrollbarColor: "pink" }}>
                {filters.map((filterObj) => (
                    <div
                        key={filterObj.filter}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '4px 8px',
                            border: '1px solid #1890ff',
                            borderRadius: '4px',
                            background: '#1890ff',
                            color: '#fff',
                            whiteSpace: 'nowrap',
                            height: '30px',
                            margin: '2px 0',
                        }}
                    >
                        <span>{filterObj.filter}:</span>
                        <span style={{ marginLeft: '8px', border: "1px solid #1890ff", borderRadius: '4px', padding: '2px 4px', backgroundColor: '#fff', color: '#1890ff' }}>
                            {filterObj.tags.join(', ')}
                        </span>
                        <EditOutlined
                            style={{ marginLeft: '8px', cursor: 'pointer' }}
                            onClick={() => {
                                setActiveFilter(filterObj.filter);
                                setDropdownOpen(false);
                            }}
                        />
                        <CloseOutlined
                            onClick={() => handleRemoveFilter(filterObj.filter)}
                            style={{ marginLeft: '8px', cursor: 'pointer' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterComponent;
