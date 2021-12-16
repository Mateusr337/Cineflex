import './style.css';

export default function Footer ({ film, date, hour }){

    return(
        <footer className="footer">
            <div className="image">
                <img src={film.posterURL} alt={film.title}/>
            </div>

            <div className="revision">
                <span className="name">{film.title}</span>
                {date !== undefined && <span className="dateFilm">{date.weekday} - {hour}</span>}
            </div>
        </footer>
    )
}