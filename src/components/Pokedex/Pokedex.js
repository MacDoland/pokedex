import React from 'react';
import PokemonService from '../../services/pokemon-service';
import Card from '../Card/Card';


class Pokedex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: []
        }

        PokemonService.getPokemons([1, 2,3,4,5,6,7,8,9,10,11,12,13,14,15]).then((pokemons) => {

            pokemons = pokemons.map((item) => item.data);

            this.setState({
                pokemon: pokemons
            });
        });
    }

    render() {
        return (
            this.state.pokemon.map((pokemon) => {
               return <Card {...pokemon} />
            })
        );
    }
}

export default Pokedex;