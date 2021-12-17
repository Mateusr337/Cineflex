import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../Header/Header';
import TitleSection from '../TitleSection/TitleSection';
import Button from '../Button/Button';
import Footer from '../Footer/Footer';
import './style.css';

export default function ScreenTimes (){

    let { idFilm } = useParams();
    const [film, setFilm] = useState();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${idFilm}/showtimes`);
        promise.then( answer => {
            setFilm(answer.data);
        })
    }, []);

    return(
        <>
        {film !== undefined? (
            <div className="screenTimes">
            <Header />
            <main> 
                <TitleSection text='Selecione o horário'/>

                {film.days.map( day => (
                    <div key={day.id} className="section">
                        <span className="descripton">{day.weekday} - {day.date}</span>

                        <div className="buttons">

                            {day.showtimes.map( hour => (
                                <Button key={hour.id} text={hour.name} destiny={`/assentos/${hour.id}`} />
                            ))}

                        </div>
                    </div>
                ))}
            </main>
            
            <Footer film={film} />
        </div>
        ) : ''}
        </>
    )

}