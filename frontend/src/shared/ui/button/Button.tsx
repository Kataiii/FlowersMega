
interface ButtonProps{
    buttonContent: string;
    clickHandler: () => void;
}

const Button: React.FC<ButtonProps> = ({buttonContent, clickHandler}) => {
    return(
        <button onClick={clickHandler}>{buttonContent}</button>
    )
}

export default Button;