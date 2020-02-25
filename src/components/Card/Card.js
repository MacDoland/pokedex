import React from 'react';
import './Card.scss';
import NumberBadge from '../NumberBadge/NumberBadge';
import TypeBadge from '../TypeBadge/TypeBadge';
import toggleTypeFilter from '../../modules/actions/pokemon/toggleTypeFilter.action';
import { connect } from 'react-redux'

function createTypeClassName(type) {
    if (Array.isArray(type)) {
        return type.join('-').toLowerCase();
    }
    else {
        return type;
    }
}

function Card(props) {
    return (
        <div className={"c-card c-card--" + createTypeClassName(props.type)}>
            <header className="c-card__header">
                <h2 className="c-card__name">{props.name}</h2>
                <NumberBadge number={props.id} />
            </header>
            <img className="c-card__image" src={props.imageUrl} alt="Bulbasausr" />
            <div className="c-card__type">
                {
                    props.type.map((type) => {
                        return <TypeBadge key={type} type={type} isSelected={props.pokemon.filteredTypes.includes(type)} onClick={() => { props.dispatch(toggleTypeFilter(type))}} />
                    })
                }
            </div>
            <div className="c-card__description">
                <p>{props.description}</p>
            </div>
        </div>
    );
}

const mapStateToProps = function (state) {
    return {
        pokemon: state.pokemon
    }
}

export default connect(mapStateToProps)(Card);