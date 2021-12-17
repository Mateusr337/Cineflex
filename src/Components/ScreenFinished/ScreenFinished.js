import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TitleSection from '../TitleSection/TitleSection';
import Button from '../Button/Button';
import './style.css';

export default function ScreenFinished({ buyerInfos, buyerSeats, buyerCPF, buyerName, setBuyerSeats, setBuyerInfos, setBuyerCPF, setBuyerName }){

    const navigate = useNavigate();
    const [comfirm, setComfirm] = useState();

    useEffect(() => {
        setComfirm(buyerSeats !== undefined && buyerSeats !== undefined && buyerName !== undefined && buyerCPF !== undefined);
    })

    function cleanBuyer (){
        setBuyerInfos(undefined);
        setBuyerSeats(undefined);
        setBuyerCPF(undefined);
        setBuyerName(undefined);

        navigate('/');
    }

    return(
        <>
        {comfirm ? (
            <div className="screenFinished">
                <main>
                    <TitleSection text={'Pedido feito com sucesso!'} />
    
                    <div className="infos">
                        <div className="info filmSection">
                            <span className="description">Filme e sessão <br /></span>
                            <span className="text">{buyerInfos.movie.title}<br /> {buyerInfos.day.weekday} {buyerInfos.day.date}</span>
                        </div>
    
                        <div className="info tickets">
                            <span className="description">Ingressos <br /></span>
                            {buyerSeats.map( (seat, index) => (
                                <span key={index} className="text">Assento {seat} <br /></span>
                            ))}
                        </div>
    
                        <div className="info buyer">
                            <span className="description">Comprador <br /></span>
                            <span className="text">Nome: {buyerName} <br /> CPF: {buyerCPF}</span>
                        </div>
                    </div>
    
                    <div className="button">
                        <Button text={'Voltar pra Home'} onClick={cleanBuyer}/>
                    </div>
                </main>
            </div>
        ) : ''}
        </>
    )
}