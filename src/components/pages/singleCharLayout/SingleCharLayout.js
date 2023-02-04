import { Helmet } from "react-helmet";

import "./singleCharLayout.scss";

const SingleCharLayout = ({ data }) => {
    const { name, thumbnail, description } = data;

    const checkedDescr = description || "The character description is missing";

    let style = { objectFit: "cover" };

    if (
        thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ||
        thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif"
    ) {
        style = { objectFit: "fill" };
    }
    return (
        <div className="single-char">
            <Helmet>
                <meta name="description" content={`Information about ${name} character`} />
                <title>{name}</title>
            </Helmet>

            <figure className="single-char__figure">
                <img src={thumbnail} alt={name} style={style} />
            </figure>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{checkedDescr}</p>
            </div>
        </div>
    );
};

export default SingleCharLayout;
