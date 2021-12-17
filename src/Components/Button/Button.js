import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Button ({ text, destiny, onClick }) {

    return(
        <>
        {destiny === undefined ? (
            <Container onClick={onClick} >{text}</Container>
        ) : (
            <Link to={destiny}>
                <Container>{text}</Container>
            </Link>
        )}
        </>
    )
}

const Container = styled.button`
    background-color: #E8833A;
    border: none;
    border-radius: 3px;

    color: #FFFFFF;
    font-size: 18px;
    line-height: 21px;

    display: flex;
    align-items: center;
    justify-content: center;
`

