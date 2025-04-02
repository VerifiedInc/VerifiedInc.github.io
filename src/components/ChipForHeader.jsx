import React, { useState, useId, useEffect, useRef } from 'react';
import Chip from '@mui/material/Chip';

// This is an image used to indicate a component type (e.g. input, button, etc.)

export default ({label, color, isLeftMargined, isRightMargined}) => { 
    if (isLeftMargined) {
        return (
            <>
                <Chip className="chip-for-header-with-left-margin" label={label} color={color} variant="outlined" size="small"/>
            </>
        );
    } else if (isRightMargined) {
        return (
            <>
                <Chip className="chip-for-header-with-right-margin" label={label} color={color} variant="outlined" size="small"/>
            </>
        );
    } else {
        return (
            <>
                <Chip label={label} color={color} variant="outlined" size="small"/>
            </>
        );
    }
};