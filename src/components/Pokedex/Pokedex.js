import React from 'react';
import { connect } from 'react-redux'
import Card from '../Card/Card';
import { getFilteredPokemonSelector } from '../../modules/reducers/pokemon.reducer';

const Pokedex = (props) => {
  const { pokemon } = props;

   return (
    pokemon.map((model) => {
      return <Card key={pokemon.id} {...model} />
    })
  );
}

const mapStateToProps = function (state) {
  return {
    pokemon: getFilteredPokemonSelector(state)
  }
}

export default connect(mapStateToProps)(Pokedex);