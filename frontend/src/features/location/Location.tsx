import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { selectActiveCity } from "../../entities/city/redux/selectors";
import { addCity } from "../../entities/city/redux/slice";
import CityPanel from "../../entities/city/ui/cityPanel/CityPanel";
import { ReactComponent as LocationIcon } from "../../shared/assets/location.svg";
import ModalEmpty from "../../shared/ui/modalEmpty/ModalEmpty";
import PrimaryText from "../../shared/ui/primaryText/PrimaryText";
import { useCitiesControllerGetByNameQuery } from "../../store/city";
import { useAppDispatch, useAppSelector } from "../../store/store";
import CenteredSpin from "../../shared/ui/spinner/CenteredSpin";

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


const Location: React.FC = () => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const activeCity = useAppSelector(selectActiveCity);
    const { isLoading, data } = useCitiesControllerGetByNameQuery({ name: "Москва" });

    useEffect(() => {
        if (!isLoading && activeCity === null) {
            dispatch(addCity(data ?? null));
        }
    }, [isLoading]);

    return (
        <>
            <Container onClick={() => setIsOpen(true)}>
                <LocationIcon fill="#73D982"/>
                <PrimaryText>{isLoading ? <CenteredSpin /> : activeCity?.name}</PrimaryText>
            </Container>
            <ModalEmpty isOpen={isOpen} setIsOpen={setIsOpen}>
                <CityPanel activeCity={activeCity} />
            </ModalEmpty>
        </>
    )
}

export default Location;