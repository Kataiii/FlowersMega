import { styled } from "styled-components";
import { ReactComponent as CatalogIcon } from "../../shared/assets/catalog.svg";
import PrimaryText from "../../shared/ui/primaryText/PrimaryText";

const Container = styled.div`
    background-color: var(--block-bg-color);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--primary-bg-color);
    border-radius: 6px;
    cursor: pointer;
    padding: 12px 16px;
    gap: 6px;

    &:hover{
        background-color: var(--block-bg-color-hover);
    }
`;

type CatalogProps = {
    clickHandler: () => void;
}

const Catalog: React.FC<CatalogProps> = ({clickHandler}) => {
    return(
        <Container onClick={clickHandler}>
            <PrimaryText>Каталог</PrimaryText>
            <CatalogIcon/>
        </Container>
    )
}

export default Catalog;