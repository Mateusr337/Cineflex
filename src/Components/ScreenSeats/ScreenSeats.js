import React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
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
    const [film, setFilm] = useState();
    const [allSeats, setAllSeats] = useState();
    const userName = useRef('');
    const userCPF = useRef('');
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
        let name =  userName.current.value;
        let cpf = userCPF.current.value;

        let index;
        if( selectedSeatsId.includes(idSeat) && availability){
            index = selectedSeatsId.indexOf(idSeat);
            selectedSeatsId.splice(index, 1);
            buyers.splice(index, 1);
            
        }else if( !selectedSeatsId.includes(idSeat) && availability ){
            selectedSeatsId.push(idSeat);
            buyers.push({idSeat: idSeat, name, cpf});

        } else if ( !availability ){
            toast.warn('Por favor selecione outro, este está indisponivel');
        }
        return putAllSeats(film);
    }

    function putAllSeats(){
        setAllSeats(
            film.seats.map( seat => {
                seat.isAvailable? status='seat available' : status='seat notAvailable';
                if(selectedSeatsId.includes(seat.id)) {status='seat selected'; seatsName.push(seat.name)}

                return <Seat seat={seat} key={seat.id} status={status} ValidInputs={ValidInputs}/>
            })
        )
    }

    function sendRequest(){
        setLoading(true);
        const promise = axios.post(`https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many`,
             {ids: selectedSeatsId, compradores: buyers});

        promise.then(() => {
            navigate('/sucesso');
            setFilmBuyers(film);
            setBuyers(buyers);
            setSeatsName(seatsName);
            setLoading(false);
        });
        promise.catch(() => toast.error('Sua requisão falhou! Tente novamente!'));
    }

    function ValidInputs (idSeat, availability){
        userName.current.value === '' && userCPF.current.value === ''? toast.warn('Digite seu nome e CPF') : 
        userCPF.current.value.length !== 11 ? toast.warn('O CPF deve conter 11 números!') : getSeats(idSeat, availability);
    }

    function ConfirmSendRequest(){
        selectedSeatsId.length === 0? toast.warn('Selecione ao menos um assento!') : sendRequest();
    }

    return (
        <>
        {film !== undefined && !loading ? (
        <div className="screenSeats">
            <main>
                <BackButton destiny={`/sessoes/${film.movie.id}`} />
                <TituleSection text={'Selecione o(s) assento(s)'} />

                <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                limit={1}
                />

                <div className="seats">
                    {allSeats !== undefined? allSeats :(
                        film.seats.map( seat => {
                            seat.isAvailable? status='seat available' : status='seat notAvailable';
                            if(selectedSeatsId.includes(seat.id)) {status='seat selected'; seatsName.push(seat.name)}
            
                            return <Seat seat={seat} key={seat.id} status={status} ValidInputs={ValidInputs}/>
                        })
                    )}
                </div>

                <div className="styleSeats">
                    <Seat text={'Selecionado'} border={'#1AAE9E'} background={'#8DD7CF'} />
                    <Seat text={'Disponível'} border={'#7B8B99'} background={'#C3CFD9'} />
                    <Seat text={'Indisponível'} border={'#F7C52B'} background={'#FBE192'} />
                </div>

                <div className="inputs">
                    <span className="name descriptionInput">Nome do comprador</span>

                    <input 
                    type="text"
                    placeholder={'Digite seu nome...'}
                    ref={userName} />

                    <span className="cpf descriptionInput">CPF do comprador</span>
                    
                    <input 
                    type="number"
                    placeholder={'Digite seu CPF...'}
                    ref={userCPF}/>
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