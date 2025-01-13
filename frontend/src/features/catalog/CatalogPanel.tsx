import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import FilterPanel from "../../entities/filter/ui/FilterPanel";
import { Title } from "../../shared/ui/forAdditionalPages/Title";
import RadioButton from "../../shared/ui/radioButton/RadioButton";
import { useOutsideClick } from "../../shared/utils/hooks/useOutsideClick";
import { Category, useCategoriesControllerGetAllQuery } from "../../store/category";
import CenteredSpin from "../../shared/ui/spinner/CenteredSpin";
import { Skeleton } from "antd";

const Container = styled.div`
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 100;
    background-color: var(--block-bg-color);
    padding: 24px;
    border-radius: 0 0 6px 6px;
    display: flex;
    gap: 70px;
`;

interface CatalogPanelProps {
    onClose: () => void;
}

const CatalogPanel: React.FC<CatalogPanelProps> = ({ onClose }) => {
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const { isLoading, data } = useCategoriesControllerGetAllQuery();
    const [activeItem, setActiveItem] = useState<Category>();

    return (
        <Container ref={panelRef}>
            {isLoading ? (
                <Skeleton active />
            ) : (
                <div style={{ width: "25%" }}>
                    {data &&
                        data.map((item, index) => (
                            <RadioButton
                                content={item.name}
                                key={`radio_button-${index}`}
                                value={item.id ?? ""}
                                isActive={activeItem?.id === item.id}
                                clickHandler={() => setActiveItem(item)}
                            />
                        ))}
                </div>
            )}
            <div style={{ flexGrow: 5 }}>
                <Title style={{ fontSize: 24 }}>{activeItem?.name}</Title>
                {activeItem ? <FilterPanel category={activeItem} /> : null}
            </div>
        </Container>
    );
};

export default CatalogPanel;