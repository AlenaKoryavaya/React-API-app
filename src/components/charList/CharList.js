import { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";
import PropTypes from "prop-types";

import "./charList.scss";

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

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);
    const [selectedChar, setSelectedChar] = useState(null);

    const { process, setProcess, getAllCharacters } = useMarvelService();

    // если init - true -> то это получ первичная загрузка
    useEffect(() => {
        onReguest(offset, true);
    }, []); // [] - то, функция выполниться только 1 раз (т.к. зависимость [])

    const onReguest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllCharacters(offset)
            .then(onCharsLoaded)
            .then(() => setProcess("confirmed"));
    };

    const onCharsLoaded = (newCharList) => {
        // проверяем, не закончились ли еще персонажи от сервера (ended)
        let ended = newCharList.length < 9 ? true : false;

        setCharList((charList) => [...charList, ...newCharList]);
        setNewItemsLoading((newItemsLoading) => false);
        setOffset((offset) => offset + 9);
        setCharEnded((charEnded) => ended);
    };

    const onCharSelected = (id, i) => {
        setSelectedChar(i);
        props.onCharSelected(id);
    };

    function displayChars(charList) {
        const elements = charList.map((item, i) => {
            const { id, name, thumbnail } = item;
            // Добавляем красную тень выбранному персонажу
            const styleSelectedImg =
                i === selectedChar ? "char__item char__item_selected" : "char__item";
            // Корректируем формат картинки (not found)
            let styleImgFormat = { objectFit: "cover" };
            if (
                thumbnail ===
                    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ||
                thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif"
            ) {
                styleImgFormat = { objectFit: "fill" };
            }

            return (
                <CSSTransition key={id} classNames="char__item" timeout={500}>
                    <li
                        className={styleSelectedImg}
                        tabIndex={0}
                        onClick={() => onCharSelected(id, i)}
                        onKeyDown={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                                onCharSelected(id, i);
                            }
                        }}
                    >
                        <img src={thumbnail} alt={name} style={styleImgFormat} />
                        <div className="char__name">{name}</div>
                    </li>
                </CSSTransition>
            );
        });
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>{elements}</TransitionGroup>
            </ul>
        );
    }

    return (
        <div className="char__list">
            {setContent(process, () => displayChars(charList), newItemsLoading)}
            <button
                className="button button__main button__long"
                disabled={newItemsLoading}
                // убираем кнопку если персонажи закончились (style)
                style={{ display: charEnded ? "none" : "block" }}
                onClick={() => onReguest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

CharList.propTypes = {
    onCharSelected: PropTypes.func,
};

export default CharList;
