import { useRef, useState } from "react";
import { styled } from "styled-components";
import FilterPanel from "../../entities/filter/ui/FilterPanel";
import { Title } from "../../shared/ui/forAdditionalPages/Title";
import RadioButton from "../../shared/ui/radioButton/RadioButton";
import { useOutsideClick } from "../../shared/utils/hooks/useOutsideClick";
import { Category, useCategoriesControllerGetAllQuery } from "../../store/category";

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

const CatalogPanel: React.FC = () => {
    const {isLoading, data} = useCategoriesControllerGetAllQuery();
    const [activeItem, setActiveItem] = useState<Category>();

    return(
        <Container>
            {
                isLoading
                ?   <p>Загрузка...</p>
                :   <div style={{width: "25%"}}>

                        {
                            data && data.map((item,index) => {
                                return <RadioButton 
                                            content={item.name}
                                            key={`radio_buuton-${index}`}
                                            value={item.id ?? ''}
                                            isActive={activeItem?.id === item.id}
                                            clickHandler={() => setActiveItem(item)}
                                            />
                            })
                        }
                    </div>
            }
            <div style={{flexGrow: 5}}>
                <Title style={{fontSize: 24}}>{activeItem?.name}</Title>
                <FilterPanel/>
            </div>
        </Container>
    )
}

export default CatalogPanel;