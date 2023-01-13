import { useState, useEffect } from "react";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";
import PropTypes from "prop-types";

import "./charList.scss";

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedChar, setSelectedChar] = useState(null);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    // создаем экземпляр класса
    const marvelService = new MarvelService();

    useEffect(() => {
        onReguest();
    }, []); // [] - то, функция выполниться только 1 раз (т.к. зависимость [])

    const onReguest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset).then(onCharsLoaded).catch(onError);
    };

    const onCharListLoading = () => {
        setNewItemsLoading(true);
    };

    const onCharsLoaded = (newCharList) => {
        // проверяем, не закончились ли еще персонажи от сервера (ended)
        let ended = newCharList.length < 9 ? true : false;

        setCharList((charList) => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemsLoading(false);
        setOffset((offset) => offset + 9);
        setCharEnded(ended);
    };

    const onError = () => {
        setLoading(false);
        setError(true);
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
                <li
                    className={styleSelectedImg}
                    key={id}
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
            );
        });
        return <ul className="char__grid">{elements}</ul>;
    }

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const list = !(loading || error) ? displayChars(charList) : null;

    return (
        <div className="char__list">
            {list}
            {spinner}
            {errorMessage}
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
