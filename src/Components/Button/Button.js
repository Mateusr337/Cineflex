import { Link } from 'react-router-dom';
import './style.css';

export default function Button ({ text, destiny, onClick }) {

    return(
        <>
        {destiny === undefined ? (
            <button onClick={onClick} >{text}</button>
        ) : (
            <Link to={destiny}>
                <button>{text}</button>
            </Link>
        )}
        </>
    )
}

