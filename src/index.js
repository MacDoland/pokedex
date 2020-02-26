import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App/App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './modules/reducers/reducer';
import addNewPokemon from './modules/actions/pokemon/addPokemons.action';
import addPokemonTypes from './modules/actions/pokemon/addPokemonTypes.action';
import PokemonService from './services/pokemon-service';
import { distinctFilter } from './modules/filters/filters';
import Trie from './modules/data-structures/trie';

require('intersection-observer');

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

let state = store.getState();

PokemonService.getPokemons(state.pokemon.pokemonStartIndex, state.pokemon.pokemonEndIndex).then((pokemons) => {
    store.dispatch(addNewPokemon(new Trie(pokemons.data, (item) => item.name)));

    let types = pokemons.data.slice(0).map(item => item.type);

    let mergedTypes = [];
    types.forEach((item) => {
        mergedTypes = mergedTypes.concat(item);
    });

    mergedTypes = mergedTypes.filter(distinctFilter);

    store.dispatch(addPokemonTypes(mergedTypes));
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));