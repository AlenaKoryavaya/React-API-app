import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

// Динамические импорты, lazy components ( подключаются после основных )
const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicLayout = lazy(() => import("../pages/singleComicLayout/SingleComicLayout"));
const SingleCharLayout = lazy(() => import("../pages/singleCharLayout/SingleCharLayout"));
const SinglePage = lazy(() => import("../pages/SinglePage"));

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />
                <main>
                    {/* при переходах между страницами (при медлен загрузке) будет появл-ся спинер  (fallback - Spinner)*/}
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/comics" element={<ComicsPage />} />
                            <Route
                                path="/comics/:id"
                                element={
                                    <SinglePage Component={SingleComicLayout} dataType="comic" />
                                }
                            />
                            <Route
                                path="/characters/:id"
                                element={
                                    <SinglePage Component={SingleCharLayout} dataType="character" />
                                }
                            />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default App;
