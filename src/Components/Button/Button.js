import { Link } from 'react-router-dom';
import './style.css';

export default function Button ({ text, destiny }){

    return(
        <Link to={destiny}>
            <button>{text}</button>
        </Link>
    )
}