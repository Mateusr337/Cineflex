import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Header from '../Header/Header';
import TituleSection from '../TitleSection/TitleSection';
import Button from '../Button/Button';
import Footer from '../Footer/Footer';
import './style.css';

export default function ScreenSeats (){

    const { idSessao } = useParams();
    let status;
    const [film, setFilm] = useState();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`);
        promise.then( answer => {
            setFilm(answer.data);
            console.log(answer.data);
        })
    }, [])

    return (
        <>
        {film !== undefined? (
        <div className="screenSeats">
            <Header />
            <main>
                <TituleSection text={'Selecione o(s) assento(s)'} />

                <div className="seats">
                    {film.seats.map( seat => {
                        seat.isAvailable? status='seat available' : status='seat notAvailable';
                        return <div key={seat.id} className={status} >{seat.name}</div>
                    })}
                </div>

                <div className="styleSeats">
                    <div className="styleSeat">
                        <div className="seat" style={{backgroundColor: '#8DD7CF', border: '1px solid #1AAE9E'}}></div>
                        <span>Selecionado</span>
                    </div>

                    <div className="styleSeat" >
                        <div className="seat" style={{backgroundColor: '#7B8B99', border: '1px solid #7B8B99'}}></div>
                        <span>Disponível</span>
                    </div>

                    <div className="styleSeat">
                        <div className="seat" style={{backgroundColor: '#FBE192', border: '1px solid #F7C52B'}} ></div>
                        <span>Indisponível</span>
                    </div>
                </div>

                <div className="inputs">
                    <span className="name descriptionInput">Nome do comprador</span>
                    <input placeholder={'Digite seu nome...'}/>
                    <span className="cpf descriptionInput">CPF do comprador</span>
                    <input placeholder={'Digite seu CPF...'}/>
                </div>

                <div className="button">
                    <Button text={'Reservar assento(s)'} destiny={`/sucesso`}/>
                </div>
            </main>
            
            <Footer film={film.movie} date={film.day} hour={film.name} />
        </div>) : ''}
        </>
        
    )
}