import React from 'react';
import { connect } from 'react-redux'
import Card from '../Card/Card';


const Pokedex = (props) => {
    return (
        props.pokemon.collection.map((pokemon) => {
            return <Card {...pokemon} />
        })
    );
}

const mapStateToProps = function(state) {
    return {
      pokemon: state.pokemon
    }
  }

export default connect(mapStateToProps)(Pokedex);