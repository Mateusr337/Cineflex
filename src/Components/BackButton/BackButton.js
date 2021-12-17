import { Link } from 'react-router-dom';
import Arrow from '../../assets/back.svg';
import React from 'react';
import styled from 'styled-components';

export default function BackButton ({destiny}){
    return(
        <Link to={destiny}>
            <Container>
                <img src={Arrow} alt={'arrow-back'} />
            </Container>
        </Link>
    )
}

const Container = styled.div`
    width: 30px;
    height: 30px;

    border: 1px solid #363636;
    border-radius: 50%;
    background-color: #C3CFD9;

    position: fixed;
    top: 80px;
    left: 20px;
    z-index: 8;
`;

