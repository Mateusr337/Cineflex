import Header from '../Header/Header';
import TituleSection from '../TitleSection/TitleSection';
import Button from '../Button/Button';

import './style.css';

export default function ScreenSeats (){

    let numbers = [];
    for(let i=0; i < 50; i++){
        numbers.push(i + 1);
    }

    return (
        <div className="screenSeats">
            <Header />
            <main>

                <TituleSection text={'Selecione o(s) assento(s)'} />
                <div className="seats">
                    {numbers.map( number => (
                        <div key={number} className="seat">{number}</div>
                    ))}
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
                    <Button text={'Reservar assento(s)'}/>
                </div>

            </main>
        </div>
    )
}