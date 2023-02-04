import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
    const [char, setChar] = useState({});
    const { loading, error, clearError, getCharacterById } = useMarvelService();

    useEffect(() => {
        updateChar();
        // const timerId = setInterval(updateChar, 60000);
        // return () => { clearInterval(timerId) };
    }, []);

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacterById(id).then(onCharLoaded);
    };

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(spinner || errorMessage) ? <View char={char} /> : null;

    return (
        <div className="randomchar">
            {/* Если в перем null, то на странице ничего не отрендерится */}
            {spinner}
            {errorMessage}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!
                    <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    );
};

// Просто рендарищийся компонент без логики
const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;

    const checkedDescr = !description
        ? "The character description is missing"
        : `${description.slice(0, 210)}...`;

    let style = { objectFit: "cover" };

    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        style = { objectFit: "fill" };
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={style} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{checkedDescr}</p>
                <div className="randomchar__btns">
                    <a
                        href={homepage}
                        rel="noreferrer"
                        className="button button__main"
                        target="_blank"
                    >
                        <div className="inner">Homepage</div>
                    </a>
                    <a
                        href={wiki}
                        rel="noreferrer"
                        className="button button__secondary"
                        target="_blank"
                    >
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;
