import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TitleSection from '../TitleSection/TitleSection';
import Button from '../Button/Button';
import Loading from '../ScreenLoading/ScreenLoading';
import styled from 'styled-components';
import './style.css';

export default function ScreenFinished({ buyers, setBuyers, filmBuyers, setFilmBuyers, seatsName, setSeatsName }){

    const navigate = useNavigate();
    const [show, setShow] = useState();

    useEffect(() => {
        setShow(buyers !== undefined && filmBuyers !== undefined);
    })

    function cleanBuyer (){
        setBuyers(undefined);
        setFilmBuyers(undefined);
        setSeatsName(undefined);
        navigate('/');
        setShow(false);
    }

    return(
        <>
        {show ? (
            <div className="screenFinished">
                <main>
                    <TitleSection text={'Pedido feito com sucesso!'} />
    
                    <div className="infos">
                        <div className="info filmSection">
                            <span className="description">Filme e sessão <br /></span>
                            <span className="text">{filmBuyers.movie.title}<br /> {filmBuyers.day.weekday} {filmBuyers.day.date}</span>
                        </div>
    
                        {buyers.map( (buyer, index) => (
                            <>
                            <Separador />
                            <div className="info tickets">
                                <span className="description">Ingressos <br /></span>
                                <span className="text">Assento {seatsName[index]} <br /></span>
                            </div>
    
                            <div className="info buyer">
                                <span className="description">Comprador <br /></span>
                                <span className="text">Nome: {buyer.name} <br /> CPF: {buyer.cpf}</span>
                            </div>
                            </>
                        ))}
                        
                    </div>
    
                    <div className="button">
                        <Button text={'Voltar pra Home'} onClick={cleanBuyer}/>
                    </div>
                </main>
            </div>
        ) : <Loading />}
        </>
    )
}

const Separador = styled.div`
    width: 100%;
    height: 2px;
    background-color: #363636;
`