import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import TitleSection from '../TitleSection/TitleSection';
import Button from '../Button/Button';
import Footer from '../Footer/Footer';
import BackButton from '../BackButton/BackButton';
import './style.css';
import Loading from '../ScreenLoading/ScreenLoading';

export default function ScreenTimes (){

    let { idFilm } = useParams();
    const [loading, setLoading] = useState(false);
    const [film, setFilm] = useState();

    useEffect(() => {
        setLoading(true);
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${idFilm}/showtimes`);
        promise.then( answer => {
            setFilm(answer.data);
            setLoading(false);
        })
    }, []);

    return(
        <>
        {film !== undefined && !loading? (
        <div className="screenTimes">
            <main> 
                <BackButton destiny={'/'} />
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
        ) : <Loading />}
        </>
    )

}