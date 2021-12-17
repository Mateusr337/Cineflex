import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import TituleSection from '../TitleSection/TitleSection';
import Button from '../Button/Button';
import Footer from '../Footer/Footer';
import BackButton from '../BackButton/BackButton';
import Loading from '../ScreenLoading/ScreenLoading';
import './style.css';

var selectedSeatsId = [];
var seatsName =[];
var buyers = [];

export default function ScreenSeats ({ setBuyers, setFilmBuyers, setSeatsName }){
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState('');
    const [userCPF, setUserCPF] = useState('');
    const { idSessao } = useParams();
    const [film, setFilm] = useState();
    const [allSeats, setAllSeats] = useState();
    let status;

    useEffect(() => {
        setLoading(true);
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`);
        promise.then( answer => {
            setFilm(answer.data);
            setLoading(false);
        })
    }, [])

    function getSeats(idSeat, availability){
        seatsName = [];

        let index;
        if( selectedSeatsId.includes(idSeat) && availability){
            index = selectedSeatsId.indexOf(idSeat);
            selectedSeatsId.splice(index, 1);
            buyers.splice(index, 1);
        }else if( !selectedSeatsId.includes(idSeat) && availability ){
            selectedSeatsId.push(idSeat);
            buyers.push({idSeat: idSeat, name: userName, cpf: userCPF});
        } else if ( !availability ){
            alert('Por favor selecione outro, este está indisponivel');
        }

        setAllSeats(
            film.seats.map( seat => {
                seat.isAvailable? status='seat available' : status='seat notAvailable';
                if( selectedSeatsId.includes(seat.id) ) {
                    status='seat selected'
                    seatsName.push(seat.name)
                 }else{status=status}

                return <div onClick={() => getSeats(seat.id, seat.isAvailable)} key={seat.id} className={status} >{seat.name}</div>
            })
        )
    }

    console.log(buyers);
    console.log(userName, userCPF)

    function sendRequest(){
        setLoading(true);
        const promise = axios.post(
            `https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many`,
             {ids: selectedSeatsId, compradores: buyers})
        promise.then(() => {
            navigate('/sucesso');
            setFilmBuyers(film);
            setBuyers(buyers);
            setSeatsName(seatsName);
            setLoading(false);
        })
        promise.catch(() => {
            alert('Sua requisão falhou!')
        })
    }

    function ValidInputs (idSeat, availability){
        userName != undefined && userCPF !== undefined
    }


    return (
        <>
        {film !== undefined && !loading? (
        <div className="screenSeats">
            <main>
                <BackButton destiny={`/sessoes/${film.movie.id}`} />
                <TituleSection text={'Selecione o(s) assento(s)'} />

                <div className="seats">
                    {allSeats !== undefined? allSeats : (
                        film.seats.map( seat => {
                            seat.isAvailable? status='seat available' : status='seat notAvailable';
                            return (
                            <div
                            onClick={() => getSeats(seat.id, seat.isAvailable)}
                            key={seat.id}
                            className={status}>
                                {seat.name}
                            </div>)
                        })
                    )}
                </div>

                <div className="styleSeats">
                    <div className="styleSeat">
                        <div className="seat" style={{backgroundColor: '#8DD7CF', border: '1px solid #1AAE9E'}}></div>
                        <span>Selecionado</span>
                    </div>

                    <div className="styleSeat" >
                        <div className="seat" style={{backgroundColor: '#C3CFD9', border: '1px solid #7B8B99'}}></div>
                        <span>Disponível</span>
                    </div>

                    <div className="styleSeat">
                        <div className="seat" style={{backgroundColor: '#FBE192', border: '1px solid #F7C52B'}} ></div>
                        <span>Indisponível</span>
                    </div>
                </div>

                <div className="inputs">
                    <span className="name descriptionInput">Nome do comprador</span>

                    <input 
                    placeholder={'Digite seu nome...'}
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} />

                    <span className="cpf descriptionInput">CPF do comprador</span>

                    <input 
                    placeholder={'Digite seu CPF...'}
                    value={userCPF} 
                    onChange={(e) => setUserCPF(e.target.value)}/>
                </div>

                <div className="button">
                    <Button onClick={sendRequest} text={'Reservar assento(s)'}/>
                </div>
            </main>
            
            <Footer film={film.movie} date={film.day} hour={film.name} />
        </div>) : <Loading />}
        </>
        
    )
}