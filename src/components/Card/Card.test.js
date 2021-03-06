import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { defaultState, pokemonReducer } from '../../modules/reducers/pokemon.reducer';
import Card from './Card';

const reduxRender = (component, store = createStore(pokemonReducer, defaultState)) => {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store
    }
}

describe('Card', () => {
    test('With example Pokemon - component renders expected', () => {
        //Arrange
        let mockPokemon = {
            id: 12,
            name: "Examplemon",
            description: "This is an example Pokemon",
            type: ['fire'],
            imageUrl: './images/example-pokemon.png'
        }

        //Act
        const { container } = reduxRender(<Card {...mockPokemon} />);

        //Assert
        const idElement = container.querySelector('.c-number-badge span')
            , nameElement = container.querySelector('.c-card__name')
            , descriptionElement = container.querySelector('.c-card__description p')
            , imageElement = container.querySelector('.c-card__image img');

        let typeElement;

        expect(idElement).toHaveTextContent(mockPokemon.id);
        expect(nameElement).toHaveTextContent(mockPokemon.name);
        expect(descriptionElement).toHaveTextContent(mockPokemon.description);
        expect(imageElement).toHaveAttribute('src', mockPokemon.imageUrl);

        mockPokemon.type.forEach((type) => {
            typeElement = container.querySelector('.c-type-badge--' + type);
            expect(typeElement).toHaveAttribute('title', 'Type: ' + type);
        });
    });
});
