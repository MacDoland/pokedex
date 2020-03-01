import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import toggleTypeFilter from '../../modules/actions/pokemon/toggleTypeFilter.action';
import './TypeBadge.scss';

function TypeBadge(props) {
    const { dispatch, selectedTypes , type } = props;

    const setClassName = (type, isSelected) => {
        return ["c-type-badge c-type-badge--", type, isSelected ? " c-type-badge--is-selected" : ""].join('');
    }

    const getTypeImagePath = (type) => {
        return '/images/icons/pokemon-type/' + type + '.svg';
    }

    const isSelected = selectedTypes.includes(type);

    return (
        <button className={setClassName(type, isSelected)} title={"Type: " + type} onClick={() => { dispatch(toggleTypeFilter(type)) }}>
            <img className="c-type-badge__image" src={process.env.PUBLIC_URL + getTypeImagePath(type)} alt={type + ' badge'} />
        </button>
    );
}

TypeBadge.propTypes = {
    type: PropTypes.string.isRequired
}

const mapStateToProps = function (state) {
    return {
        selectedTypes: state.pokemon.filteredTypes
    }
}

export default connect(mapStateToProps)(TypeBadge);