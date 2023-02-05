import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./comicsList.scss";

const setContent = (process, Component, newItemsLoading) => {
    switch (process) {
        case "waiting":
            return <Spinner />;
        case "loading":
            return newItemsLoading ? <Component /> : <Spinner />;
        case "confirmed":
            return <Component />;
        case "error":
            return <ErrorMessage />;
        default:
            throw new Error("Unexpected process state");
    }
};

const ComicsList = (props) => {
    const [comicsList, setComicsList] = useState([]);
    const [newComicsLoading, setNewComicsLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, process, setProcess, clearError, getAllComics } = useMarvelService();

    useEffect(() => {
        onReguest(offset, true);
    }, []);

    const onReguest = (offset, initial) => {
        clearError();
        initial ? setNewComicsLoading(false) : setNewComicsLoading(true);
        getAllComics(offset)
            .then(onCharsLoaded)
            .then(() => setProcess("confirmed"));
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

    return (
        <div className="comics__list">
            {setContent(process, () => displayComics(comicsList), newComicsLoading)}
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
