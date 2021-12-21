import { render } from 'react-dom';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';

import Header from './Components/Header/Header';
import ScreenFilms from './Components/ScreenFilms/ScreenFilms';
import ScreenTimes from './Components/ScreenTimes/ScreenTimes';
import ScreenSeats from './Components/ScreenSeats/ScreenSeats';
import ScreenFinished from './Components/ScreenFinished/ScreenFinished';

import './reset.css';
import './style.css';

window.title = 'Cineflex'

export default function App(){
    
    const [films, setFilms] = useState();
    const [filmBuyers, setFilmBuyers] = useState();
    const [buyers, setBuyers] = useState();
    const [seatsName, setSeatsName] = useState();

    useEffect(() => {
        const promise = axios.get('https://mock-api.driven.com.br/api/v4/cineflex/movies');
        promise.then( elements => {
            setFilms(elements.data);
        })
    }, []);

    return (
        <>
        <Header />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ScreenFilms films={films}/>} />
                <Route path="/sessoes/:idFilm" element={<ScreenTimes />} />

                <Route path="/assentos/:idSessao" element={<ScreenSeats 
                setFilmBuyers={setFilmBuyers}
                setBuyers={setBuyers}
                setSeatsName={setSeatsName}/>} />

                <Route path="/sucesso" element={<ScreenFinished 
                setFilmBuyers={setFilmBuyers}
                setSeatsName={setSeatsName}
                setBuyers={setBuyers}
                buyers={buyers}
                filmBuyers={filmBuyers}
                seatsName={seatsName} />} />
            </Routes>
        </BrowserRouter>
        </>
    );
}

render(<App />, document.querySelector(".root"));