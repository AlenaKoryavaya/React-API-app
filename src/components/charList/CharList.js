import { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

class CharList extends Component {
    // синтаксис полей классов
    state = {
        charList: [],
        loading: true,
        error: false,
    };

    // создаем экземпляр класса
    marvelService = new MarvelService();

    componentDidMount = () => {
        this.marvelService.getAllCharacters().then(this.onCharsLoaded).catch(this.onError);
    };

    onCharsLoaded = (charList) => {
        this.setState({
            charList, // char: char,
            loading: false,
        });
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    };

    displayChars = (charList) => {
        // eslint-disable-next-line
        let classNames = "char__item char__item_selected";

        const elements = charList.map((item) => {
            const { id, name, thumbnail } = item;
            let style = { objectFit: "cover" };

            if (
                thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ) {
                style = { objectFit: "fill" };
            }
            return (
                <li className="char__item" key={id} onClick={() => this.props.onCharSelected(id)}>
                    <img src={thumbnail} alt={name} style={style} />
                    <div className="char__name">{name}</div>
                </li>
            );
        });

        return <ul className="char__grid">{elements}</ul>;
    };

    render() {
        const { charList, loading, error } = this.state;
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const list = !(loading || error) ? this.displayChars(charList) : null;

        return (
            <div className="char__list">
                {list}
                {spinner}
                {errorMessage}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharList;
