import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./comicsList.scss";

const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, clearError, getAllComics } = useMarvelService();

    useEffect(() => {
        onReguest(offset, true);
    }, []);

    const onReguest = (offset, initial) => {
        clearError();
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        getAllComics(offset).then(onCharsLoaded);
    };

    const onCharsLoaded = (newCharList) => {
        // проверяем, не закончились ли еще персонажи от сервера (ended)
        let ended = newCharList.length < 8 ? true : false;

        setComicsList((comicsList) => [...comicsList, ...newCharList]);
        setNewComicsLoading(false);
        setOffset((offset) => offset + 8);
        setComicsEnded(ended);
    };

    const displayComics = (comics) => {
        const items = comics.map((item) => {
            const { id, name, price, thumbnail } = item;

            return (
                <li key={id} className="comics__item" title="More details">
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">{name}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            );
        });

        return <ul className="comics__grid">{items}</ul>;
    };

    const items = displayComics(comicsList);
    const spinner = loading && !newComicsLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <div className="comics__list">
            {items}
            {spinner}
            {errorMessage}
            <button
                className="button button__main button__long"
                disabled={newComicsLoading}
                // убираем кнопку если персонажи закончились (style)
                style={{ display: comicsEnded ? "none" : "block" }}
                onClick={() => onReguest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
