import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    // достаем сущности из сервиса
    const { loading, error, clearError, getCharacterById } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const updateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }

        clearError();
        getCharacterById(charId).then(onCharLoaded);
    };

    const skeleton = char || loading || error ? null : <Skeleton />;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {errorMessage}
            {content}
        </div>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comiclink, comics } = char;

    const checkedDescr = description || "The character description is missing";
    const comicsList = () => {
        if (comics.length === 0) {
            return <li>There are no comics with this character</li>;
        } else {
            let comicsList = comics.map((item, i) => {
                return (
                    <li className="char__comics-item" key={i}>
                        <a href={comiclink} target="_blank" rel="noreferrer">
                            {item.name}
                        </a>
                    </li>
                );
            });
            return comicsList.slice(0, 10);
        }
    };

    let style = { objectFit: "cover" };

    if (
        thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ||
        thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif"
    ) {
        style = { objectFit: "fill" };
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={style} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a
                            href={homepage}
                            className="button button__main"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className="inner">homepage</div>
                        </a>
                        <a
                            href={wiki}
                            style={{ display: !wiki ? "none" : "null" }}
                            className="button button__secondary"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{checkedDescr}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">{comicsList()}</ul>
        </>
    );
};

CharInfo.propTypes = {
    charId: PropTypes.number,
};

export default CharInfo;
