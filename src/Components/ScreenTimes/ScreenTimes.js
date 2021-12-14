import Header from '../Header/Header';
import TituleSection from '../TitleSection/TitleSection';
import Button from '../Button/Button';
import Footer from '../Footer/Footer';

import './style.css';

export default function ScreenTimes (){
    return(
        <div className="screenTimes">
            <Header />
            <main> 
                <TituleSection text='Selecione o horário'/>

                <div className="section">
                    <span className="descripton">Quinta-feira - 24/06/2021</span>
                    <div className="buttons">
                        <Button text={'15:00'} />
                        <Button text={'15:00'} />
                    </div>
                </div>

                <div className="section">
                    <span className="descripton">Quinta-feira - 24/06/2021</span>

                    <div className="buttons">
                        <Button text={'15:00'} />
                        <Button text={'15:00'} />
                    </div>
                </div>

                <Footer />
            </main>
        </div>
    )}