import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import "../../style/button.scss";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <p
                style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "30px",
                    marginTop: "20px",
                }}
            >
                The page doesn't exist
            </p>
            <div style={{ textAlign: "center" }}>
                <Link to="/">
                    <button className="button button__main button__long">
                        <div className="inner">Back to main page</div>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Page404;
