import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import setContent from "../../utils/setContent";

import useMarvelService from "../../services/MarvelService";

import "./charInfo.scss";

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    // достаем сущности из сервиса
    const { process, setProcess, clearError, getCharacterById } = useMarvelService();

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
        getCharacterById(charId)
            .then(onCharLoaded)
            .then(() => setProcess("confirmed"));
    };

    return <div className="char__info">{setContent(process, View, char)}</div>;
};

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comiclink, comics } = data;

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
