import React from 'react';
import './TypeBadge.scss';

function getTypeImagePath(type){
    return '/images/icons/pokemon-type/' + type + '.svg';
}

function TypeBadge(props) {
    return (
        <div className={"c-type-badge c-type-badge--" + props.type } title={"Type: " + props.type }>
            <img className="c-type-badge__image" src={ process.env.PUBLIC_URL + getTypeImagePath(props.type) } alt={props.type + ' badge'} />
        </div>
    );
}

export default TypeBadge;