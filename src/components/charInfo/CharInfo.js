import { Component } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
    };

    // создаем экземпляр объекта
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        // важно! не забыть сравнить пропсы перед обновлением
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    onCharLoaded = (char) => {
        this.setState({
            char, // char: char,
            loading: false,
        });
    };

    onLoading = () => {
        this.setState({
            loading: true,
        });
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    };

    updateChar = () => {
        const { charId } = this.props;
        if (!charId) {
            return;
        }

        this.onLoading();
        this.marvelService.getCharacter(charId).then(this.onCharLoaded).catch(this.onError);
    };

    render() {
        const { char, loading, error } = this.state;

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
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    const comicsList = () => {
        if (comics.length === 0) {
            return <li>There are no comics with this character</li>;
        } else {
            let comicsList = comics.map((item, i) => {
                return (
                    <li className="char__comics-item" key={i}>
                        <a href={item.resourceURI} target="_blank" rel="noreferrer">
                            {item.name}
                        </a>
                    </li>
                );
            });
            return comicsList.slice(0, 10);
        }
    };

    let imgStyle = { objectFit: "cover" };

    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyle = { objectFit: "fill" };
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
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
                            className="button button__secondary"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">{comicsList()}</ul>
        </>
    );
};

export default CharInfo;
