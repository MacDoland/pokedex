import React from 'react';
import './ControlBar.scss';
import { connect } from 'react-redux'
import changeMaxRange from '../../modules/actions/pokemon/changeMaxRange.action';
import toggleTypeFilter from '../../modules/actions/pokemon/toggleTypeFilter.action';
import searchByName from '../../modules/actions/pokemon/searchByName.action';
import { getFilteredPokemonSelector } from '../../modules/reducers/pokemon.reducer';
import TypeBadge from '../TypeBadge/TypeBadge';

function ControlBar(props) {
    return (
        <div className="c-control-bar">
            <div className="c-control-bar__inner">
                <div>
                    <h1 className="c-control-bar__heading">{props.heading}</h1>
                    <p>Pokemon visible: {props.filteredPokemon.length}</p>
                </div>
                <div className="c-control-bar__controls">
                    <input placeholder="filter by name" type="text" value={props.pokemon.nameSearchString} onChange={(e) => {
                        props.dispatch(searchByName(e.target.value));
                    }} />
                    <div className="c-control-bar__controls-types">
                        {
                            props.pokemon.types.map((type) => {
                                return <TypeBadge key={type} type={type} isSelected={props.pokemon.filteredTypes.includes(type)} onClick={() => { props.dispatch(toggleTypeFilter(type)) }} />
                            })
                        }
                    </div>
                    <input type="range" min={props.pokemon.pokemonStartIndex} max={props.pokemon.pokemonEndIndex} value={props.pokemon.maxRange} className="c-control-bar__controls-slider" id="range" onChange={(e) => {
                        props.dispatch(changeMaxRange(e.target.value));
                    }} />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = function (state) {
    return {
        pokemon: state.pokemon,
        filteredPokemon: getFilteredPokemonSelector(state)
    }
}

export default connect(mapStateToProps)(ControlBar);