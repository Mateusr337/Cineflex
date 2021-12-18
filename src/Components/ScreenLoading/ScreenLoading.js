import styled from 'styled-components';
import Load from '../../assets/loading.gif'
;export default function Loading (){
    return(
        <Container>
            <Box>
                <img src={Load} />
                Carregando ....
            </Box>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vw;

    padding-top: 150px;

    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
`
const Box = styled.div`
    width: 40%;
    height: 30%;

    gap: 20px;

    background-color: #C3CFD9;
    border: 1px solid #E8833A;
    color: #E8833A;
    border-radius: 10px;
    font-size: 30px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img{
        width: 40%;
    }
`