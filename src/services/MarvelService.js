import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, error, request, clearError } = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=7bb779595667b5381fd0ca5c8939611b";
    const _baseOffset = 200;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const getComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    };

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description
                ? `${char.description.slice(0, 210)}...`
                : "The character description is missing",
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        };
    };

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            name: comics.title,
            price: !comics.prices.price ? "For free" : comics.prices.price,
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            url: comics.urls[0].url,
        };
    };

    return { loading, error, clearError, getAllCharacters, getCharacter, getComics };
};

export default useMarvelService;
