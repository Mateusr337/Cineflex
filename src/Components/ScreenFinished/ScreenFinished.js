import Header from '../Header/Header';
import TitleSection from '../TitleSection/TitleSection';
import Button from '../Button/Button';
import './style.css';

export default function ScreenFinished(){
    
    return(
        <div className="screenFinished">
            <Header />
            <main>
                <TitleSection text={'Pedido feito com sucesso!'} />

                <div className="infos">
                    <div className="info filmSection">
                        <span className="description">Filme e sessão <br /></span>
                        <span className="text">Enola Holmes <br /> 24/06/2021 15:00</span>
                    </div>

                    <div className="info tickets">
                        <span className="description">Ingressos <br /></span>
                        <span className="text">Assento 15 <br /> Assento 16</span>
                    </div>

                    <div className="info buyer">
                        <span className="description">Comprador <br /></span>
                        <span className="text">Nome: João da Silva Sauro <br /> CPF: 123.456.789-10</span>
                    </div>
                </div>

                <div className="button">
                    <Button text={'Voltar pra Home'} />
                </div>
            </main>
        </div>
    )
}