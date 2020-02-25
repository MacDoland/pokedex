import React from 'react';
import './Card.scss';
import { connect } from 'react-redux'
import NumberBadge from '../NumberBadge/NumberBadge';
import TypeBadge from '../TypeBadge/TypeBadge';
import toggleTypeFilter from '../../modules/actions/pokemon/toggleTypeFilter.action';
import { ViewportImage } from '../Image/Image';

const createTypeClassName = (type) => {
    if (Array.isArray(type)) {
        return type.join('-').toLowerCase();
    }
    else {
        return type;
    }
}

const Card = (props) => {
    const { id, name, type, pokemon, description, imageUrl, dispatch } = props;
    return (
        <div className={"c-card c-card--" + createTypeClassName(type)}>
            <header className="c-card__header">
                <h2 className="c-card__name">{name}</h2>
                <NumberBadge number={id} />
            </header>
            <ViewportImage src={imageUrl} alt={name} />
            <div className="c-card__type">
                {
                    type.map((type) => {
                        return <TypeBadge key={type} type={type} isSelected={pokemon.filteredTypes.includes(type)} onClick={() => { dispatch(toggleTypeFilter(type)) }} />
                    })
                }
            </div>
            <div className="c-card__description">
                <p>{description}</p>
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