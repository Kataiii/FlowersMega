import { styled } from "styled-components";
import { Button, Input } from "antd";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import Catalog from "../../../features/catalog/Catalog";
import Location from "../../../features/location/Location";
import { CartButton } from "../../../entities/cart/ui/CartButton";
import { FavoriteButton } from "../../../entities/favorites/ui/FavoritesButtn";
import ProfileButton from "../../../entities/credential/ui/ProfileButton";
import { useEffect, useRef, useState } from "react";
import CatalogPanel from "../../../features/catalog/CatalogPanel";
import { useOutsideClick } from "../../utils/hooks/useOutsideClick";
import { InputRef } from 'antd';
import { Product, useProductsSizesControllerSearchQuery } from "../../../store/product";
import { Debouncer } from "../../utils/debounce";
import { createSearchParams, useNavigate } from "react-router-dom";
import { CATALOG_PATH, CATEGORY_PATH } from "../../utils/constants";
import { useProductContext } from "./ProductContext";
import { ButtonText } from "../../../pages/admin/ui/products/Products";

const { Search } = Input;

interface SecondHeaderProps {
    onSearchChange?: (value: string) => void;
}

const Container = styled.div`
    width: 90%;
    background-color: var(--block-bg-color);
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    margin: 0 auto;
    border-radius: 6px;
    position: relative;
`;

const CatalogSearch = styled.div`
    position: absolute;
    top: 100%;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    border-radius: 6px;
    background: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
    max-height: 300px;
    overflow-y: auto;
`;

const SecondHeader: React.FC<SecondHeaderProps> = ({ onSearchChange }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("all");
    const { setSelectedProduct, setCategory } = useProductContext();
    const divContainer = useRef<HTMLDivElement>(null);
    const { data: searchedData } = useProductsSizesControllerSearchQuery(searchTerm);
    const [searchResults, setSearchResults] = useState<{ category: string[], products: string[] }>();
    const debouncer = new Debouncer();
    const navigate = useNavigate();

    useOutsideClick(divContainer, () => setIsOpen(false));

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        debouncer.debounce(() => {
            setSearchTerm(value === "" ? "all" : value);
            if (onSearchChange) {
                onSearchChange(value);
            }
        }, 1000)();
    };

    const handleInputFocus = () => {
        setIsOpen(true);
    };

    useEffect(() => {
        if (searchedData && searchedData.category && searchedData.products) {
            setSearchResults({
                category: searchedData.category.map(category => category.name),
                products: searchedData.products.map(product => product.name),
            });
        } else {
            setSearchResults(undefined);
        }
    }, [searchedData]);

    const highlightMatch = (text: string, searchTerm: string) => {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, index) =>
            part.toLowerCase() === searchTerm.toLowerCase()
                ? <span key={index} style={{ color: 'var(--primary-bg-color)' }}>{part}</span>
                : part
        );
    };

    const handleCategoryClick = (categoryName: string) => {
        setCategory(categoryName);
        navigate({
            pathname: `${CATALOG_PATH}${CATEGORY_PATH}`,
            search: createSearchParams({ category: categoryName }).toString(),
        });
        setIsOpen(false);
    };

    const handleProductClick = (productName: string) => {
        setSelectedProduct(productName);
        navigate({ pathname: `${CATALOG_PATH}` });
        setIsOpen(false);
    };

    return (
        <Container ref={divContainer}>
            <Catalog clickHandler={() => setIsOpen(isOpen => !isOpen)} />
            <Location />
            <div style={{ flexGrow: "1", position: "relative" }}>
                <Search
                    prefix={<SearchIcon />}
                    placeholder="Поиск"
                    allowClear
                    size="large"
                    onChange={handleSearchChange}
                    onFocus={handleInputFocus}
                />
                {isOpen && (
                    searchResults && (searchResults.products.length > 0 || searchResults.category.length > 0) ? (
                        <CatalogSearch>
                            <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
                                <div style={{ margin: '10px 0' }}>
                                    {searchResults.products.map((result, index) => (
                                        <li
                                            key={index}
                                            style={{ padding: '5px 0', fontFamily: "Inter", cursor: "pointer" }}
                                            onClick={() => handleProductClick(result)}
                                        >
                                            {highlightMatch(result, searchTerm)}
                                        </li>
                                    ))}
                                </div>

                                {searchResults.category.length > 0 && (
                                    <>
                                        <strong style={{ fontFamily: "Inter", margin: "10px 0" }}>Категории:</strong>
                                        <div style={{ margin: '10px 0' }}>
                                            {searchResults.category.map((result, index) => (
                                                <li
                                                    key={index}
                                                    style={{ padding: '5px 0', fontFamily: "Inter", cursor: "pointer" }}
                                                    onClick={() => handleCategoryClick(result)}
                                                >
                                                    {highlightMatch(result, searchTerm)}
                                                </li>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </ul>
                        </CatalogSearch>
                    ) : (
                        <CatalogSearch>
                            <strong style={{ fontFamily: "Inter", margin: "10px 0" }}>Ничего не найдено</strong>
                        </CatalogSearch>
                    )
                )}
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
                <ProfileButton />
                <CartButton />
                <FavoriteButton />
            </div>
        </Container>
    );
};

export default SecondHeader;

