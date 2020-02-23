import { combineReducers } from 'redux';
import pokemonReducer from './pokemon.reducer';

const reducers = combineReducers({
    pokemon: pokemonReducer
});

export default reducers;