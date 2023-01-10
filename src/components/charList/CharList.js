import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";
import PropTypes from "prop-types";

import "./charList.scss";

class CharList extends Component {
    // синтаксис полей классов
    state = {
        charList: [],
        loading: true,
        error: false,
        selectedChar: null,
        newItemsLoading: false,
        offset: 210,
        charEnded: false,
    };

    // создаем экземпляр класса
    marvelService = new MarvelService();

    componentDidMount = () => {
        this.onReguest();
    };

    onReguest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset).then(this.onCharsLoaded).catch(this.onError);
    };

    onCharListLoading = () => {
        this.setState({
            newItemsLoading: true,
        });
    };

    onCharsLoaded = (newCharList) => {
        // проверяем, не закончились ли еще персонажи от сервера
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({ charList, offset }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemsLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }));
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    };

    onCharSelected = (id, i) => {
        this.setState({
            selectedChar: i,
        });

        this.props.onCharSelected(id);
    };

    displayChars = (charList) => {
        const elements = charList.map((item, i) => {
            const { id, name, thumbnail } = item;
            // Добавляем красную тень выбранному персонажу
            const styleSelectedImg =
                i === this.state.selectedChar ? "char__item char__item_selected" : "char__item";
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
                    onClick={() => this.onCharSelected(id, i)}
                    onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            this.onCharSelected(id, i);
                        }
                    }}
                >
                    <img src={thumbnail} alt={name} style={styleImgFormat} />
                    <div className="char__name">{name}</div>
                </li>
            );
        });

        return <ul className="char__grid">{elements}</ul>;
    };

    render() {
        const { charList, loading, error, newItemsLoading, offset, charEnded } = this.state;
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const list = !(loading || error) ? this.displayChars(charList) : null;

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
                    onClick={() => this.onReguest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func,
};

export default CharList;
