import ReactDom from 'react-dom';
import ScreenFilms from './Components/ScreenFilms/ScreenFilms';
import ScreenTimes from './Components/ScreenTimes/ScreenTimes';
import ScreenSeats from './Components/ScreenSeats/ScreenSeats';
import ScreenFinished from './Components/ScreenFinished/ScreenFinished';

import './reset.css';
import './style.css';

export default function App(){
    return (
        //<ScreenFilms />
        //<ScreenTimes />
        //<ScreenSeats />
        <ScreenFinished />
    )}

ReactDom.render(<App />, document.querySelector(".root"));