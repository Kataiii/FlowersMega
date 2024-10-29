import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProductContextType {
    selectedProduct: string | null;
    setSelectedProduct: React.Dispatch<React.SetStateAction<string | null>>;
    category: string | null;
    setCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProductContext must be used within a ProductProvider");
    }
    return context;
};

// Define the props for the ProductProvider
interface ProductProviderProps {
    children: ReactNode;
}

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [category, setCategory] = useState<string | null>(null);
    return (
        <ProductContext.Provider value={{ selectedProduct, setSelectedProduct, category, setCategory }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
