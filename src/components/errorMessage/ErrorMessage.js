import error from "./error.gif";
import "./errorMessage.scss";

const ErrorMessage = () => {
    return (
        <div className="randomchar__error">
            <img src={error} alt="error" />
        </div>
    );
};

export default ErrorMessage;
