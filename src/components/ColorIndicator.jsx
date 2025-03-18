import React, { useState, useId, useEffect, useRef } from 'react';

// This is an image used to indicate a color

export default ({color, isRightMargined}) => { 
    const fileString = "/img/color-indicators/" + color + ".svg";
    if (isRightMargined) {
        return (
            <>
                <img className="color-indicator-with-right-margin" src={fileString}/>
            </>
        );
    } else {
        return (
            <>
                <img className="color-indicator" src={fileString}/>
            </>
        );
    }
};