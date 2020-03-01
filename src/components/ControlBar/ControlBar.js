import React from 'react';
import './ControlBar.scss';
import { connect } from 'react-redux'
import changeMaxRange from '../../modules/actions/pokemon/changeMaxRange.action';
import searchByName from '../../modules/actions/pokemon/searchByName.action';
import { getFilteredPokemonSelector } from '../../modules/reducers/pokemon.reducer';
import TypeBadge from '../TypeBadge/TypeBadge';
import Dropdown from 'react-dropdown'
import ActionTypes from '../../modules/actions/action-types';
import defaultAction from '../../modules/actions/pokemon/default.action';
import 'react-dropdown/style.css'
import { throttle } from 'lodash';

function ControlBar(props) {

    const options = [
        { value: ActionTypes.SORT_ID_ASCENDING, label: 'pokemon number ascending' },
        { value: ActionTypes.SORT_ID_DESCENDING, label: 'pokemon number descending' },
        { value: ActionTypes.SORT_NAME_ASCENDING, label: 'pokemon name ascending' },
        { value: ActionTypes.SORT_NAME_DESCENDING, label: 'pokemon name descending' }
    ]

    const { heading, pokemon, dispatch, filteredPokemon } = props;

    return (
        <div className="c-control-bar">
            <div className="c-control-bar__inner">
                <div className="c-control-bar__header-group">
                    <h1 className="c-control-bar__heading">{heading}</h1>
                    <p>Pokemon visible: {filteredPokemon.length} / <input type="number" min={pokemon.pokemonStartIndex} max={pokemon.pokemonEndIndex} value={pokemon.maxRange} className="c-control-bar__controls-slider" id="range" onChange={throttle((e) => {
                        dispatch(changeMaxRange(e.target.value > pokemon.pokemonEndIndex ? pokemon.pokemonEndIndex : e.target.value));
                    }, 400)} /></p>
                </div>
                <div className="c-control-bar__controls">
                    <div>
                        <p>Filter by name</p>
                        <input placeholder="filter by name" type="text" value={pokemon.nameSearchString} onChange={(e) => {
                            dispatch(searchByName(e.target.value));
                        }} />
                    </div>
                    <div className="c-control-bar__controls-types">
                        <p>Filter by type</p>
                        <div className="c-control-bar__controls-type-icons">
                            {
                                pokemon.types.map((type) => {
                                    return <TypeBadge key={'control-bar-' + type } type={type} />
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <p>Sort</p>
                        <Dropdown options={options} value={pokemon.sortSelection}  onChange={(value) => {
                            dispatch(defaultAction(ActionTypes.SORT_ID_ASCENDING, value));
                        }} />
                    </div>
                </div>
            </div>
        </div >
    );
}

const mapStateToProps = function (state) {
    return {
        pokemon: state.pokemon,
        filteredPokemon: getFilteredPokemonSelector(state)
    }
}

export default connect(mapStateToProps)(ControlBar);