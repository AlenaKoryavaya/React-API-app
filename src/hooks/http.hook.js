import { useState, useCallback } from "react";

export const useHttp = () => {
    // Принцип конечного автомата FSM (Finite-state machine)
    const [process, setProcess] = useState("waiting");

    const request = useCallback(
        // мемоизир ф-ю
        async (
            url,
            method = "GET",
            body = null,
            headers = { "Content-type": "application/json" }
        ) => {
            // перед отправкой запроса активируем спинер
            setProcess("loading");
            // отправляем fetch на сервер
            try {
                const res = await fetch(url, { method, body, headers });
                // проверить результат ответа
                if (!res.ok) {
                    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
                }

                const data = await res.json();
                // setProcess("confirmed") - т.к. ф-я async то изменять сост стоит после получения опред данных; ручная установка внутри компонента.
                return data;
            } catch (e) {
                // е - приходит автоматич. из браузера // метод (message) - содерж инфо об ошибке
                throw e;
            }
        },
        []
    );

    // чтобы перезатереть ошибку (кликом на 'try it')
    const clearError = useCallback(() => {
        setProcess("loading");
    }, []);

    return { process, setProcess, request, clearError };
};
