import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TituleSection from '../TitleSection/TitleSection';
import Button from '../Button/Button';
import Footer from '../Footer/Footer';
import BackButton from '../BackButton/BackButton';
import Loading from '../ScreenLoading/ScreenLoading';
import Seat from '../Seat/Seat';
import './style.css';

var selectedSeatsId = [];
var seatsName = [];
var buyers = [];

export default function ScreenSeats ({ setBuyers, setFilmBuyers, setSeatsName }){
    const navigate = useNavigate();
    const { idSessao } = useParams();

    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState(undefined);
    const [userCPF, setUserCPF] = useState(undefined);
    const [film, setFilm] = useState();
    const [allSeats, setAllSeats] = useState();
    let status;

    useEffect(() => {
        setLoading(true);
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`);
        promise.then( answer => {
            setFilm(answer.data);
            setLoading(false);
            putAllSeats(answer.data);
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
            toast('Por favor selecione outro, este está indisponivel');
        }
        return putAllSeats(film);
    }

    function putAllSeats(film){
        setAllSeats(
            film.seats.map( seat => {
                seat.isAvailable? status='seat available' : status='seat notAvailable';
                if(selectedSeatsId.includes(seat.id)) {status='seat selected'; seatsName.push(seat.name)}

                return <Seat seat={seat} key={seat.id} status={status} ValidInputs={ValidInputs}/>
            })
        )
    }

    console.log(buyers);
    console.log(userName, userCPF)
    console.log(selectedSeatsId)

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
        promise.catch(() => toast('Sua requisão falhou! Tente novamente!'))
    }

    function ValidInputs (idSeat, availability){
        userName === undefined && userCPF === undefined ? toast('Digite seu nome e CPF') : getSeats(idSeat, availability);
    }

    function ConfirmSendRequest(){
        selectedSeatsId.length === 0? toast('Você não selecionou nenhum assento!') : sendRequest();
    }

    return (
        <>
        {film !== undefined && !loading && allSeats !== undefined ? (
        <div className="screenSeats">
            <main>
                <BackButton destiny={`/sessoes/${film.movie.id}`} />
                <TituleSection text={'Selecione o(s) assento(s)'} />

                <ToastContainer position="top-center"
                autoClose={3000} hideProgressBar={false}
                newestOnTop={false} closeOnClick
                rtl={false} pauseOnFocusLoss
                draggable pauseOnHover limit={1}/>

                <div className="seats">
                    {allSeats}
                </div>

                <div className="styleSeats">
                    <Seat text={'Selecionado'} border={'#1AAE9E'} background={'#8DD7CF'} />
                    <Seat text={'Disponível'} border={'#7B8B99'} background={'#C3CFD9'} />
                    <Seat text={'Indisponível'} border={'#F7C52B'} background={'#FBE192'} />
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
                    <Button onClick={ConfirmSendRequest} text={'Reservar assento(s)'}/>
                </div>
            </main>
            
            <Footer film={film.movie} date={film.day} hour={film.name} />
        </div>) : <Loading />}
        </>
    )
}