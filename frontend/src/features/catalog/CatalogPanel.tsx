import { styled } from "styled-components";

const Container = styled.div`
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 100;
`;

const CatalogPanel: React.FC = () => {
    return(
        <Container>
            <p>Каталог</p>
        </Container>
    )
}

export default CatalogPanel;