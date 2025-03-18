import React, { useState, useId, useEffect, useRef } from 'react';

// This is an image used to indicate a component type (e.g. input, button, etc.)

export default ({type, isRightMargined}) => { 
    const fileString = "/img/component-type-indicators/" + type + ".svg";
    if (isRightMargined) {
        return (
            <>
                <img className="component-type-indicator-with-right-margin" src={fileString}/>
            </>
        );
    } else {
        return (
            <>
                <img className="component-type-indicator" src={fileString}/>
            </>
        );
    }
};