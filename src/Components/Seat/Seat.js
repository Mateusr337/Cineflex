import styled from 'styled-components';

export default function Seat ({ seat, status, ValidInputs, text, border, background }){

    return(
        <>
        {text === undefined ? (
        <Container
        onClick={() => ValidInputs(seat.id, seat.isAvailable)}
        className={status}>
        {seat.name}
        </Container>
        ) : (
            <StyleSeat>
                <Container border={border} background={background} text={text}></Container>
                <span>{text}</span>
            </StyleSeat>
            )}
        </>
    );
}

const Container = styled.div`
    width: 26px;
    height: 26px;

    background-color: ${props => props.background};
    border: 1px solid ${props => props.border};
    border-radius: 50%;

    font-size: 11px;
    line-height: 13px;
    letter-spacing: 4%;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover{
        cursor: ${props => props.text !== undefined ? 'auto' : 'pointer'};
    }
`

const StyleSeat = styled.div`
    gap: 5px;

    font-size: 13px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`