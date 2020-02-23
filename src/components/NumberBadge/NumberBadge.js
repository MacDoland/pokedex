import React from 'react';
import './NumberBadge.scss';

function NumberBadge(props) {
    return (
        <div className="c-number-badge" title={"number: " + props.number }>
            <span>{props.number}</span>
        </div>
    );
}

export default NumberBadge;