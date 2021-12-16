import Header from '../Header/Header';
import TituleSection from '../TitleSection/TitleSection';
import Film from '../Film/Film';
import './style.css';

export default function ScreenFilms ({ films }){

    return(
        <div className="screenFilms">
            <Header />
            <main>
                <TituleSection text={'Selecione o filme'} />

                <div className="films">
                    {films.map( (film) => (
                       <Film key={film.id} film={film} />
                    ))}
                </div>

            </main>
        </div>
)}