import Button from "../button/Button";


interface ModalProps{
    title: string;
    content?: string;
    buttonContent: string;
    clickHandler: () => void;
}

const Modal: React.FC<ModalProps> = ({title, content, buttonContent, clickHandler}) => {
    return(
        <div>
            <h1>{title}</h1>
            {
                content != undefined
                ? <p>{content}</p>
                : null
            }
            <Button buttonContent={buttonContent} clickHandler={clickHandler}/>
        </div>
    )
}

export default Modal;