import React from 'react';
import styled from 'styled-components';

export default function Header (){
    return(
        <Container >
            <span className="text">CINEFLIX</span>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 67px;

    background-color: #C3CFD9;

    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;

    .text{ 
        color: #E8833A;
        font-size: 34px;
        line-height: 40px;
    }
`