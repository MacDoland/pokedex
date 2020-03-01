import React from 'react';
import './Card.scss';
import NumberBadge from '../NumberBadge/NumberBadge';
import TypeBadge from '../TypeBadge/TypeBadge';
import { ViewportImage } from '../Image/Image';
import PropTypes from 'prop-types';

const createTypeClassName = (type) => {
    if (Array.isArray(type)) {
        return type.join('-').toLowerCase();
    }
    else {
        return type;
    }
}

const Card = (props) => {
    const { id, name, type, description, imageUrl } = props;
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
                        return <TypeBadge key={ id + type } type={type} />
                    })
                }
            </div>
            <div className="c-card__description">
                <p>{description}</p>
            </div>
        </div>
    );
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.array.isRequired,
    imageUrl: PropTypes.string.isRequired,
}

export default Card;