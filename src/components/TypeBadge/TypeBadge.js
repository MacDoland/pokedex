import React from 'react';
import PropTypes from 'prop-types';
import './TypeBadge.scss';

function TypeBadge(props) {
    const setClassName = (type, isSelected) => {
        return ["c-type-badge c-type-badge--", props.type, isSelected ? " c-type-badge--is-selected" : ""].join('');
    }

    const getTypeImagePath = (type) => {
        return '/images/icons/pokemon-type/' + type + '.svg';
    }

    return (
        <button className={setClassName(props.type, props.isSelected)} title={"Type: " + props.type} onClick={props.onClick}>
            <img className="c-type-badge__image" src={process.env.PUBLIC_URL + getTypeImagePath(props.type)} alt={props.type + ' badge'} />
        </button>
    );
}

TypeBadge.propTypes = {
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    isSelected: PropTypes.bool.isRequired,
}

TypeBadge.defaultProps = {
    isSelected: false
};

export default TypeBadge;