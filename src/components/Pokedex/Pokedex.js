import React from 'react';
import { connect } from 'react-redux'
import Card from '../Card/Card';

const Pokedex = (props) => {

  const filter = (items, max) => {
    return items.slice(0, max);
  }

  return (
    filter(props.pokemon.collection, props.pokemon.maxRange).map((pokemon) => {
      return <Card key={pokemon.id} {...pokemon} />
    })
  );
}

const mapStateToProps = function (state) {
  return {
    pokemon: state.pokemon
  }
}

export default connect(mapStateToProps)(Pokedex);