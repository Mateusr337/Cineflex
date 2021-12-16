import { Link } from 'react-router-dom';

export default function Film ({ film }){

    return(
    <Link to={`/sessoes/${film.id}`}>
        <div key={film.id} className="film">
            <img src={film.posterURL} alt={film.title} />
        </div>
    </Link>
    )
}