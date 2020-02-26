import React from 'react';
import './App.scss';
import ControlBar from '../ControlBar/ControlBar';
import Pokedex from '../Pokedex/Pokedex';


//store.dispatch(changeMinRange);


function App() {
  return (
    <div className="c-app">
        <ControlBar heading="PokeDex" />
        <Pokedex />
    </div>
  );
}

export default App;
