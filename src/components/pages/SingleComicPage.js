import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./singleComicPage.scss";

const SingleComicPage = () => {
    const { comicId } = useParams();

    const [comicData, setComicData] = useState(null);
    const { loading, error, clearError, getComic } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const updateComic = () => {
        clearError();
        getComic(comicId).then(onComicLoaded);
    };

    const onComicLoaded = (comic) => {
        setComicData(comic);
    };

    const View = ({ data }) => {
        const { name, thumbnail, description, language, pages, price } = data;

        return (
            <div className="single-comic">
                <img src={thumbnail} alt={name} className="single-comic__img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{`${pages} pages`}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">
                    Back to all
                </Link>
            </div>
        );
    };

    const content = !(loading || error || !comicData) ? <View data={comicData} /> : null;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <>
            {content}
            {spinner}
            {errorMessage}
        </>
    );
};

export default SingleComicPage;
