import React from 'react';
import PokemonService from '../../services/pokemon-service';
import Card from '../Card/Card';


class Pokedex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: []
        }

        let pokemonIds = Array.from(Array(20).keys());
        pokemonIds.shift(); //remove 0 element

        PokemonService.getPokemons(pokemonIds, (response) => {
            this.addPokemon(response.data);
        });
    }

    addPokemon(pokemon) {
        let pokemons = this.state.pokemon;
        pokemons.push(pokemon);//check for id here to prevent dups
        this.setState({
            pokemon: this.mergeSort(pokemons)
        });
    }

    mergeSortedArrays(array1, array2) {
        var mergedArray = []
        var totalLength = array1.length + array2.length;

        if (array1.length == 0) {
            console.log("empty 1");
        }

        if (array2.length == 0) {
            console.log("empty 2");
        }

        var i = 0, j = 0;


        while (mergedArray.length != totalLength) {

            if (array1[i].id <= array2[j].id) {
                mergedArray.push(array1[i]);
                i++
            }
            else {
                mergedArray.push(array2[j]);
                j++
            }

            if (array1.length <= i) {
                for (j = j; j < array2.length; j++) {
                    mergedArray.push(array2[j]);
                }
            }

            if (array2.length <= j) {
                for (i = i; i < array1.length; i++) {
                    mergedArray.push(array1[i]);
                }
            }
        }


        return mergedArray;
    }

    mergeSort(items) {
        if (items.length <= 1) {
            return items;
        }

        let midPoint = Math.floor(items.length / 2);
        let lowerHalf = this.mergeSort(items.slice(0, midPoint));
        let upperHalf = this.mergeSort(items.slice(midPoint));
        return this.mergeSortedArrays(lowerHalf, upperHalf);
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