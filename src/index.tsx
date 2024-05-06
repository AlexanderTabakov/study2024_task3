import React from "react";
import ReactDOM from 'react-dom'
import {BrowserRouter} from "react-router-dom";
import Global from "app/Global";
import MainPage from "pages/MainPage";

const root = (
        <BrowserRouter>
            <MainPage/>
            <Global/>
        </BrowserRouter>
)

ReactDOM.render(
    root,
    document.getElementById('root')
);