import React, { useEffect, useState } from 'react';
import { Dropdown, Button, Input, Menu, Checkbox } from 'antd';
import { PlusOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
import { FilterWithItems, useFiltersControllerCreateMutation, useFiltersControllerDeleteByIdMutation } from '../../../store/filter';
import { ItemFilter } from '../../../store/product';
import { ButtonText } from '../../../pages/admin/ui/products/Products';
import { useItemFilterControllerCreateMutation, useItemFilterControllerDeleteMutation } from '../../../store/itemFilter';

interface FilterTag {
    filter: FilterWithItems;
    tags: ItemFilter[];
}

interface FilterDropdownProps {
    disabled?: boolean;
    onChange?: (filters: FilterTag[]) => void;
    data?: FilterWithItems[];
    value?: FilterTag[];
}

const FilterComponent: React.FC<FilterDropdownProps> = ({ disabled, onChange, data, value }) => {
    const [filters, setFilters] = useState<FilterTag[]>(value || []);
    const [activeFilter, setActiveFilter] = useState<FilterWithItems | null>();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [addFilter] = useFiltersControllerCreateMutation();
    const [addTag] = useItemFilterControllerCreateMutation();
    const [deleteFilter] = useFiltersControllerDeleteByIdMutation();
    const [deleteTag] = useItemFilterControllerDeleteMutation();
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };
    useEffect(() => {
        setFilters(value || [])
    }, [value])

    const handleAddFilter = async () => {
        if (searchValue && data && !data.some(f => f.name === searchValue)) {
            try {
                const response = await addFilter({
                    createFilterDto: { name: searchValue }
                }).unwrap();
                const newFilter: FilterWithItems = { name: response.name, items: [] };
                setFilters([...filters, { filter: newFilter, tags: [] }]);
                setSearchValue('');
            } catch (error) {

                console.error("Ошибка при создании фильтра:", error);
            }


        }
    };

    const handleSelectFilter = (filter: FilterWithItems) => {
        setActiveFilter(filter);
        setSearchValue('');
    };

    const handleTagChange = (checked: boolean, tag: ItemFilter) => {
        if (activeFilter) {
            const filterIndex = filters.findIndex(f => f.filter.name === activeFilter.name);

            if (filterIndex !== -1) {
                const updatedFilters = [...filters];
                if (checked) {
                    updatedFilters[filterIndex].tags.push(tag);
                } else {
                    updatedFilters[filterIndex].tags = updatedFilters[filterIndex].tags.filter(t => t.id !== tag.id);
                }
                setFilters(updatedFilters);
                if (onChange) onChange(updatedFilters);

            } else if (checked) {
                setFilters([...filters, { filter: activeFilter, tags: [tag] }]);
                if (onChange) onChange([...filters, { filter: activeFilter, tags: [tag] }]);
            }

        }
    };

    const handleRemoveDataFilter = async (filterId: number) => {
        try {
            await deleteFilter({ id: filterId }).unwrap();
            console.log(`Фильтр с id ${filterId} успешно удален.`);
        } catch (error) {
            console.error('Ошибка при удалении фильтра:', error);
        }
    };

    const handleRemoveItemFilter = async (tagId: number) => {
        try {
            await deleteTag({ id: tagId }).unwrap();
        } catch (error) {
            console.error('Ошибка при удалении тега:', error);
        }
    }


    const handleRemoveFilter = (filter: FilterWithItems) => {
        if (disabled) return;

        const updatedFilters = filters.filter(f => f.filter.name !== filter.name);
        setFilters(updatedFilters);

        if (filter === activeFilter) {
            setActiveFilter(null);
        }

        if (onChange) {
            onChange(updatedFilters);
        }
    };


    const handleCloseMenu = () => {
        if (activeFilter) {
            setActiveFilter(null);
        } else {
            setDropdownOpen(false);
        }
    };

    const handleAddTag = async () => {
        if (activeFilter && searchValue && !activeFilter.items.some(item => item.name === searchValue)) {
            try {
                const response = await addTag({
                    name: searchValue,
                    idFilter: activeFilter.id || 0
                }).unwrap();

                const newTag: ItemFilter = { id: response.id, name: searchValue, idFilter: activeFilter.id };
                const updatedFilter = { ...activeFilter, items: [...activeFilter.items, newTag] };
                const updatedFilters = filters.map(f =>
                    f.filter.name === activeFilter.name ? { ...f, filter: updatedFilter } : f
                );

                setFilters(updatedFilters);
                setSearchValue('');
            } catch (error) {
                console.error("Ошибка при создании тега:", error);
            }
        }
    };

    const filteredAvailableFilters = data ? data.filter((filter) =>
        filter.name.toLowerCase().includes(searchValue.toLowerCase())
    ) : [];

    const filteredTags = activeFilter?.items.filter((tag) =>
        tag.name.toLowerCase().includes(searchValue.toLowerCase())
    ) || [];

    const mainMenu = (
        <div style={{ padding: "8px", backgroundColor: "#fff", border: "1px solid var(--primary-bg-color)", borderRadius: "8px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <Input
                    placeholder="Поиск..."
                    value={searchValue}
                    onChange={handleSearch}
                    style={{ width: "155px" }}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
            <Button
                type="link"
                icon={<PlusOutlined />}
                onClick={(e) => {
                    e.stopPropagation();
                    handleAddFilter();
                }}
                style={{ marginBottom: "8px", color: "var(--primary-bg-color)" }}
            >
                Создать фильтр
            </Button>
            <Menu
                items={filteredAvailableFilters.map(filter => ({
                    key: filter.name,
                    label: (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <span>{filter.name}</span>
                            <CloseOutlined
                                style={{ paddingLeft: "3px" }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveDataFilter(filter.id!);
                                }}
                            />
                        </div>
                    ),
                    onClick: () => handleSelectFilter(filter)
                }))}
            />

        </div>
    );

    const tagMenu = activeFilter && (
        <div style={{ padding: "8px", backgroundColor: "#fff", border: "1px solid #d9d9d9", borderRadius: "8px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexDirection: "column", gap: '8px' }}>
                <div>
                    <Input
                        placeholder="Поиск тегов..."
                        value={searchValue}
                        onChange={handleSearch}
                        style={{ width: "85%" }}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <Button
                        type="link"
                        icon={<CloseOutlined />}
                        onClick={handleCloseMenu}
                        style={{ color: "var(--primary-bg-color)" }}
                    />
                </div>

                <Button
                    type="link"
                    icon={<PlusOutlined />}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAddTag();
                    }}
                    style={{ marginLeft: '8px', color: "var(--primary-bg-color)" }}
                >
                    Добавить тег
                </Button>

            </div>
            <Menu>
                {filteredTags.map(tag => (
                    <Menu.Item key={tag.id}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div>
                                <Checkbox
                                    checked={filters.find(f => f.filter.name === activeFilter.name)?.tags.some(t => t.id === tag.id) || false}
                                    onChange={(e) => handleTagChange(e.target.checked, tag)}
                                >
                                    <div >
                                        <span>
                                            {tag.name}
                                        </span>

                                    </div>

                                </Checkbox>
                            </div>
                            <CloseOutlined

                                style={{ paddingLeft: "3px" }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveItemFilter(tag.id ? tag.id : 0);
                                }}
                            />
                        </div>

                    </Menu.Item>
                ))}
            </Menu>
        </div>
    );

    return (

        <div style={{ display: "flex", alignItems: "start" }}>

            <Dropdown
                menu={{
                    items: activeFilter
                        ? filteredTags.map(tag => ({
                            key: tag.id?.toString(),
                            label: (
                                <Checkbox
                                    checked={filters.find(f => f.filter.name === activeFilter.name)?.tags.some(t => t.id === tag.id) || false}
                                    onChange={(e) => handleTagChange(e.target.checked, tag)}
                                >
                                    {tag.name}
                                </Checkbox>
                            ),
                            type: 'group',
                        }))
                        : filteredAvailableFilters.map(filter => ({
                            key: filter.name,
                            label: filter.name,
                            onClick: () => handleSelectFilter(filter),
                        })),
                }}
                trigger={['click']}
                open={dropdownOpen || !!activeFilter}
                onOpenChange={(flag) => setDropdownOpen(flag)}
                dropdownRender={menu => activeFilter ? tagMenu : mainMenu}
                disabled={disabled}
            >
                <Button shape="round" type="primary" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <ButtonText>Добавить фильтр {dropdownOpen ? <CloseOutlined /> : <PlusOutlined />}</ButtonText>
                </Button>
            </Dropdown>


            <div style={{ marginLeft: '10px', display: "flex", flexDirection: "row", gap: "8px", overflowX: "auto", overflowY: "hidden", scrollbarWidth: "thin", scrollbarColor: "pink" }}>
                {filters.map((filterObj) => (
                    <div
                        key={filterObj.filter.name}
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
                        <span>{filterObj.filter.name}:</span>
                        <span style={{ marginLeft: '8px', border: "1px solid #1890ff", borderRadius: '4px', padding: '2px 4px', backgroundColor: '#fff', color: '#1890ff' }}>
                            {filterObj.tags.map(tag => tag.name).join(', ')}
                        </span>

                        {/* <EditOutlined
                            style={{ marginLeft: '8px', cursor: 'pointer' }}
                            onClick={() => {
                                setActiveFilter(filterObj.filter);
                                setDropdownOpen(false);
                            }}
                        /> */}

                        <CloseOutlined
                            disabled={disabled}
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
