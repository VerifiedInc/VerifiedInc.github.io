import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse } from "@mui/material";

/**
 * This is used to create collapsable sections. It allows one section per group to be open at a time.
 * 
 * CollapsableGroup is a wrapper component that contains CollapsableSection components.
 * CollapsableSection is a component that contains CollapsableHeader and the content.
 * CollapsableHeader is a component that contains the title of the section.
 * 
 * Example usage:
     <CollapsableGroup>
        <CollapsableSection>
            <CollapsableHeader>
                ### Title 1 
            </CollapsableHeader>
            
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec pur

            :::caution
            this is a example of a caution block
            :::
    
        </CollapsableSection>
        <CollapsableSection>
        [...]
        </CollapsableSection>
    </CollapsableGroup>
    <CollapsableGroup firstSectionExpanded={false}>
        [...]
    </CollapsableGroup>
 */


export const CollapsableHeader = ({ children, isActive }) => (
    <div className='collapsable-header'>
        {isActive ? <ExpandLess /> : <ExpandMore />}
        {children}
    </div>
);

export const CollapsableSection = ({ activeId, setActiveId, id, children }) => {
    const isActive = activeId === id;
    const header = React.Children.toArray(children).find(
        (child) => child.type === CollapsableHeader
    );

    const body = React.Children.toArray(children).filter(
        (child) => child.type !== CollapsableHeader
    );


    const handleClick = (e) => {
        // Do not toggle if the click is on a hash link
        if (e.target.classList.contains('hash-link')) {
            return;
        }

        // Toggle the active state
        setActiveId(isActive ? null : id);
    };

    return (
        <>
            <Box onClick={handleClick} style={{ cursor: "pointer", fontWeight: "bold" }}>
                {React.cloneElement(header, { isActive })}
            </Box>
            <Collapse in={isActive} >{body}</Collapse>
        </>
    );
};

/**
 * 
 * @param {firstSectionExpanded} firstSectionExpanded
 * Is optional and is used to define if the first section should be expanded by default. 
 * If not defined, the first section will be expanded by default. 
 */
export const CollapsableGroup = ({ children, firstSectionExpanded = true }) => {
    // state control for the open CollapsableSection
    const [activeId, setActiveId] = useState(-1);

    // Should render only if the activeId is not -1 but only when firstSectionExpanded is true
    const shouldRender = activeId !== -1 || !firstSectionExpanded;

    // get the first CollapsableSection and set it as active
    React.useEffect(() => {
        // 
        if (!firstSectionExpanded) {
            return;
        }
        let firstSectionIndex = -1;

        React.Children.forEach(children, (child, index) => {
            if (child.type !== CollapsableSection || firstSectionIndex !== -1) {
                return;
            }

            firstSectionIndex = index;
        });

        if (firstSectionIndex !== -1) {
            setActiveId(firstSectionIndex);
        }
    }, [children]);

    return (
        <>
            {/* Only renders if active Id was already defined to avoid transition at the beginning */}
            {shouldRender && React.Children.map(children, (child, index) => {
                if (child.type !== CollapsableSection) {
                    return child;
                }

                // Pass the activeId and setActiveId to the CollapsableSection
                return React.cloneElement(child, { activeId, setActiveId, id: index });
            })}
        </>
    )
};

CollapsableHeader.propTypes = {
    children: PropTypes.node.isRequired,
};

CollapsableSection.propTypes = {
    activeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node.isRequired,
};

CollapsableGroup.propTypes = {
    children: PropTypes.node.isRequired,
    firstSectionExpanded: PropTypes.bool,
};

