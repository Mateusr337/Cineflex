import { Link } from "react-router-dom";

import Header from '../Header/Header';
import TituleSection from '../TitleSection/TitleSection';
import './style.css';

export default function ScreenFilms ({ films }){

    console.log(films);

    return(
        <div className="screenFilms">
            <Header />
            <main>
                <TituleSection text={'Selecione o filme'} />

                <div className="films">
                    {films.map( (film) => (
                        <Link to='/times'>
                            <div key={film.id} className="film">
                                <img src={film.posterURL} alt='film' />
                            </div>
                        </Link>
                    ))}
                </div>

            </main>
        </div>
)}