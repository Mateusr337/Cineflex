import { render } from 'react-dom';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';

import ScreenFilms from './Components/ScreenFilms/ScreenFilms';
import ScreenTimes from './Components/ScreenTimes/ScreenTimes';
import ScreenSeats from './Components/ScreenSeats/ScreenSeats';
import ScreenFinished from './Components/ScreenFinished/ScreenFinished';

import './reset.css';
import './style.css';

export default function App(){

    const [films, setFilms] = useState([]);

    useEffect(() => {
        const promise = axios.get('https://mock-api.driven.com.br/api/v4/cineflex/movies');
        promise.then( elements => {
            setFilms(elements.data);
        })
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ScreenFilms films={films}/>} />
                <Route path="/times" element={<ScreenTimes />} />
                <Route path="/times" element={<ScreenSeats />} />
                <Route path="/times" element={<ScreenFinished />} />
            </Routes>
        </BrowserRouter>
    )
}

render(<App />, document.querySelector(".root"));