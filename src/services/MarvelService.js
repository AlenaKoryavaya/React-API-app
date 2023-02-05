import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { process, setProcess, request, clearError } = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=7bb779595667b5381fd0ca5c8939611b";
    const _baseOffset = 0;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    };

    const getCharacterById = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    };

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    };

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    };

    const _transformCharacter = (char) => {
        const checkLinks = (arrLinks, linkName) => {
            const item = arrLinks.filter((item) => item.type === linkName);
            return !item[0] ? null : item[0].url;
        };

        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: checkLinks(char.urls, "detail"),
            wiki: checkLinks(char.urls, "wiki"),
            comiclink: checkLinks(char.urls, "comiclink"),
            comics: char.comics.items,
        };
    };

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            name: comics.title,
            description: !comics.description
                ? "The character description is missing"
                : comics.description,
            pages: comics.pageCount,
            language: comics.textObjects.language || "en-us",
            price: !comics.prices.price ? "Not available" : comics.prices.price,
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            url: comics.urls[0].url,
        };
    };

    return {
        process,
        setProcess,
        clearError,
        getAllCharacters,
        getCharacterById,
        getCharacterByName,
        getAllComics,
        getComic,
    };
};

export default useMarvelService;
