import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './modules/reducers/reducer';
import addNewPokemon from './modules/actions/addPokemons.action';
import PokemonService from './services/pokemon-service';


const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

PokemonService.getPokemons(1, 40).then((pokemons) => {
    store.dispatch(addNewPokemon(pokemons.data));
});

store.subscribe(() => console.log(store.getState()));



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
