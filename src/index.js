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

export default function App(){
    const [films, setFilms] = useState([]);

    const [buyerInfos, setBuyerInfos] = useState();
    const [buyerSeats, setBuyerSeats] = useState();
    const [buyerCPF, setBuyerCPF] = useState();
    const [buyerName, setBuyerName] = useState();

    
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
                setBuyerSeats={setBuyerSeats} 
                setBuyerInfos={setBuyerInfos}
                setBuyerCPF={setBuyerCPF}
                setBuyerName={setBuyerName}/>} />

                <Route path="/sucesso" element={<ScreenFinished 
                buyerSeats={buyerSeats} 
                buyerInfos={buyerInfos}
                buyerCPF={buyerCPF}
                buyerName={buyerName}
                setBuyerSeats={setBuyerSeats} 
                setBuyerInfos={setBuyerInfos}
                setBuyerCPF={setBuyerCPF}
                setBuyerName={setBuyerName}/>} />
            </Routes>
        </BrowserRouter>
        </>
    );
}

render(<App />, document.querySelector(".root"));