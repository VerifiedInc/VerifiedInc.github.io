import React, { useState, useId, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box } from "@mui/material";
import AnchorOffset from '@site/src/components/AnchorOffset.jsx'


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
    const isActive = id === activeId;
    const header = React.Children.toArray(children).find(
        (child) => child.type === CollapsableHeader
    );

    const body = React.Children.toArray(children).filter(
        (child) => child.type !== CollapsableHeader
    );


    const handleClick = (e) => {
        if (e.target.classList.contains('hash-link')) {
            return;
        }
        setActiveId(isActive ? undefined : id);
    };

    return (
        <>
            <AnchorOffset id={`section-anchor-${id}`} className="section-anchor" offset="-80px" />
            <div id={`collapsable-section-${id}`} className="collapsable-section">
                <Box onClick={handleClick} style={{ cursor: "pointer", fontWeight: "bold" }}>
                    {React.cloneElement(header, { isActive: isActive })}
                </Box>
                {/* Collapse from MUI has smooth transictions, but it brings issues with scrolling large collapsed contents */}
                {/* <Collapse in={isActive} addEndListener={(() => done(isActive, id))}>{body}</Collapse> */}
                {isActive && body}
            </div >
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
    const [activeId, setActiveId] = useState(undefined);
    const componentId = useId();
    const loadedDefaultExpanded = useRef(false);

    const getCurrentIdBasedOnIndex = (index) => {
        return `${componentId}-${index}`;
    }

    const scrollToSection = (id, behavior = 'instant', offset = -80) => {
        const element = document.querySelector(`#collapsable-section-${CSS.escape(id)}`);

        // Top position of the element with the offset, since the menu obscures the top of the section
        const y = element.getBoundingClientRect().top + window.scrollY + offset;

        window.scrollTo({ top: y, behavior: behavior });
    }

    const handleChangeActive = (id) => {
        if (!id) {
            setActiveId(undefined);
            return;
        }

        setActiveId(id);
        // Timeout to make sure the element is rendered before scrolling
        setTimeout(() => {
            scrollToSection(id);
        }, 0);
    }

    // Expands the first section by default when firstSectionExpanded is true
    useEffect(() => {
        if (!firstSectionExpanded) {
            return;
        }
        let firstSectionIndex = null;

        React.Children.forEach(children, (child, index) => {
            if (child.type !== CollapsableSection || firstSectionIndex !== null) {
                return;
            }

            firstSectionIndex = index;
            loadedDefaultExpanded.current = true;
            setActiveId(getCurrentIdBasedOnIndex(firstSectionIndex));

        });

    }, []);

    // Should render if firstSectionExpanded is false or the default expanded section was already loaded
    // This is to avoid any transition animation when the first section is expanded by default
    const shouldRender = !firstSectionExpanded || loadedDefaultExpanded.current;

    return (
        <>
            {/* Only renders if active Id was already defined to avoid transition at the beginning */}
            {shouldRender && React.Children.map(children, (child, index) => {
                if (child.type !== CollapsableSection) {
                    return child;
                }

                // Pass the activeId and setActiveId to the CollapsableSection
                const cloneElement = React.cloneElement(child, { activeId, setActiveId: handleChangeActive, id: getCurrentIdBasedOnIndex(index), componentId });
                return (
                    <div key={index + componentId}>
                        {cloneElement}
                    </div>
                );
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

