import fastFurious_9 from '../../assets/fastFurious_9.jpeg';
import './style.css';

export default function Footer (){
    return(
        <footer className="footer">
            <div className="image">
                <img src={fastFurious_9} alt={'film'}/>
            </div>

            <div className="revision">
                <span className="name">Fast Furious 9 </span>
                <span className="dateFilm">Quinta-feira - 15:00</span>
            </div>
        </footer>
    )
}