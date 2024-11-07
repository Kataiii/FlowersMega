import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { SetStateAction, useState } from "react";
import {ReactComponent as Point} from "../../../../shared/assets/point.svg";
import ModalEmpty from "../../../../shared/ui/modalEmpty/ModalEmpty";
import CityModal from "../cityPanel/CityPanel";


const { Search } = Input;

const CityInput: React.FC = () => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => setIsOpen(true);

    return(
        <>
            <Search
                placeholder="Выберите город"
                allowClear
                enterButton={<Point alt="point"/>}
                size="large"
                onSearch={onSearch}
            />
            <ModalEmpty isOpen={isOpen} setIsOpen={setIsOpen}>
                <CityModal activeCity={null}/>
            </ModalEmpty>
      </>
    )
}

export default CityInput;