import React from 'react';
import { connect } from 'react-redux'
import Card from '../Card/Card';
import { getFilteredPokemonSelector } from '../../modules/reducers/pokemon.reducer';

const Pokedex = (props) => {
  const { pokemons } = props;

   return (
    pokemons.map((pokemon) => {
      return <Card key={pokemon.id} {...pokemon} />
    })
  );
}

const mapStateToProps = function (state) {
  return {
    pokemons: getFilteredPokemonSelector(state)
  }
}

export default connect(mapStateToProps)(Pokedex);