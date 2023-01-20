import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(
        // мемоизир ф-ю
        async (
            url,
            method = "GET",
            body = null,
            headers = { "Content-type": "application/json" }
        ) => {
            // перед отправкой запроса активируем спинер
            setLoading(true);
            // отправляем fetch на сервер
            try {
                const res = await fetch(url, { method, body, headers });
                // проверить результат ответа
                if (!res.ok) {
                    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
                }

                const data = await res.json();
                // т.к. ответ положит, убираем спинер
                setLoading(false);
                return data;
            } catch (e) {
                // е - приходит автоматич. из браузера
                setLoading(false);
                setError(e.message); // метод (message) - содерж инфо об ошибке
                throw e;
            }
        },
        []
    );

    // чтобы перезатереть ошибку (кликом на 'try it')
    const clearError = useCallback(() => setError(null), []);

    return { loading, error, request, clearError };
};
