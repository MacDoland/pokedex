import React from 'react';
import './App.css';
import ControlBar from './components/ControlBar/ControlBar';
import Pokedex from './components/Pokedex/Pokedex';


//store.dispatch(changeMinRange);


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ControlBar heading="PokeDex" />
        <Pokedex />
      </header>
    </div>
  );
}

export default App;
