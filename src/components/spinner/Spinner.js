import spinner from "./Spin.svg";
import "./spinner.scss";

const Spinner = () => {
    return (
        <div className="randomchar__spinner">
            <img src={spinner} alt="wait spinner" />
        </div>
    );
};

export default Spinner;
