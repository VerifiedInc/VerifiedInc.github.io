import React, { useState, useId, useEffect, useRef } from 'react';


// This is used to create a grid layout with sticky and non-sticky elements (e.g. for the Recommended UX page).


export const GridContainer = ({ children }) => (
    <div className='grid-container'>
        {children}
    </div>
);

export const GridRow = ({ children }) => (
    <div className='grid-row'>
        {children}
    </div>
);

export const GridColumn = ({ children }) => (
    <div className='grid-column'>
        {children}
    </div>
);

export const GridNonStickyElement = ({ children }) => (
    <div className='grid-non-sticky-element'>
        {children}
    </div>
);

export const GridStickyElement = ({ children }) => (
    <div className='grid-sticky-element'>
        {children}
    </div>
);