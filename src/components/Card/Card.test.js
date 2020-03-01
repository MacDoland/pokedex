import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {defaultState, pokemonReducer } from '../../modules/reducers/pokemon.reducer';
import Card from './Card';


//function from testing library
const renderWithRedux = (
    ui,
    { initialState, store = createStore(reducer, initialState) } = {}
) => {
    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        store
    }
}


test('With defaultState', () => {
    
});