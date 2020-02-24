import React from 'react';
import './ControlBar.scss';
import { connect } from 'react-redux'
import changeMaxRange from '../../modules/actions/pokemon/changeMaxRange.action';
import TypeBadge from '../TypeBadge/TypeBadge';

function ControlBar(props) {
    return (
        <div className="c-control-bar">
            <div className="c-control-bar__inner">
                <h1 className="c-control-bar__heading">{props.heading}</h1>
                <div className="c-control-bar__controls">
                    <div className="c-control-bar__controls-types">
                        {
                            props.pokemon.types.map((type) => {
                                return <TypeBadge key={type} type={type} />
                            })
                        }
                    </div>
                    <input type="range" min="1" max="151" value={props.maxRange} className="c-control-bar__controls-slider" id="range" onChange={(e) => {
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
        maxRange: state.maxRange
    }
}

export default connect(mapStateToProps)(ControlBar);