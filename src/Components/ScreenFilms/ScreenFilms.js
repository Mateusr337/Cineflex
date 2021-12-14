import Header from '../Header/Header';
import TituleSection from '../TitleSection/TitleSection';
import './style.css';

import kinoplex from '../../assets/kinoplex.jpeg';
import fastFurious_9 from '../../assets/fastFurious_9.jpeg';


export default function ScreenFilms (){
    return(
        <div className="screenFilms">
            <Header />
            <main>
                <TituleSection text={'Selecione o filme'} />
                
                <div className="colun">
                    <div className="films">
                        <div className="film">
                            <img src={kinoplex} alt='film' />
                        </div>

                        <div className="film">
                            <img src={kinoplex} alt='film' />
                        </div>

                        <div className="film">
                            <img src={kinoplex} alt='film' />
                        </div>

                        <div className="film">
                            <img src={kinoplex} alt='film' />
                        </div>

                        <div className="film">
                            <img src={kinoplex} alt='film' />
                        </div>

                    </div>

                    <div className="films">

                        <div className="film ">
                            <img src={fastFurious_9} alt='film' />
                        </div>

                        <div className="film">
                            <img src={fastFurious_9} alt='film' />
                        </div>

                        <div className="film">
                            <img src={fastFurious_9} alt='film' />
                        </div>

                        <div className="film">
                            <img src={fastFurious_9} alt='film' />
                        </div>

                        <div className="film">
                            <img src={fastFurious_9} alt='film' />
                        </div>
                    </div>
                </div>

            </main>
        </div>
)}