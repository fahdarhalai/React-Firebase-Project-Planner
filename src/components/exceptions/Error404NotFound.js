import React from 'react';
import NotFound from '../../images/404bg.jpg';

const Error404NotFound = () => {
    return (
        <div className="container not-found center-align">
            <img src={NotFound} alt="404 Not Found" id="bg-404"/>
        </div>
    )
}

export default Error404NotFound;