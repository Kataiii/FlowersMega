import { Modal } from "antd";
import Portal from "../portal/Portal";
import { ReactComponent as CloseIcon } from "../../../shared/assets/closeModal.svg";

type CityModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: JSX.Element;
};

const ModalEmpty: React.FC<CityModalProps> = ({ isOpen, setIsOpen, children }) => {
    return (
        <Portal>
            <Modal
                width={655}
                open={isOpen}
                title=""
                footer={[]}
                closeIcon={<CloseIcon />}
                onCancel={() => setIsOpen(false)}>
                {
                    children
                }
            </Modal>
        </Portal>
    )
}

export default ModalEmpty;