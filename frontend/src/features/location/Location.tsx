import { styled } from "styled-components";
import { ReactComponent as LocationIcon } from "../../shared/assets/location.svg";
import PrimaryText from "../../shared/ui/primaryText/PrimaryText";

const Container = styled.div`
    background-color: var(--block-bg-color);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    cursor: pointer;
    padding: 12px 16px;
    gap: 6px;
`;

type LocationProps = {
    cityName: string;
}

const Location: React.FC<LocationProps> = ({cityName}) => {
    return(
        <Container>
            <LocationIcon/>
            <PrimaryText>{cityName}</PrimaryText>
        </Container>
    )
}

export default Location;