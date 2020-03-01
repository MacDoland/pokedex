import React from 'react';
import handleViewport from 'react-in-viewport';

const Image = (props) => {
    const { src, alt } = props;
    return (
        <div  className="c-card__image">
            <img src={src} alt={alt} />
        </div>
    )
}


const ViewportImageComponent = (props) => {
    const { inViewport, forwardedRef, src, alt } = props;
    const image = inViewport ? <img src={src} alt={alt} /> : "";
    return (
        <div ref={forwardedRef} className="c-card__image">
            {image}
        </div>
    )
}

const ViewportImage = handleViewport(ViewportImageComponent, {
    root: null,
    rootMargin: '200px',
    threshold: 1.0
});

export { Image, ViewportImage };