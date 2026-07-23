import React, { useState, useId, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from '@docusaurus/router';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box } from '@mui/material';
import AnchorOffset from '@site/src/components/AnchorOffset.jsx';

/**
 * This is used to create collapsible sections. It allows one section per group to be open at a time.
 * 
 * CollapsibleGroup is a wrapper component that contains CollapsibleSection components.
 * CollapsibleSection is a component that contains CollapsibleHeader and the content.
 * CollapsibleHeader is a component that contains the title of the section.
 * 
 * Example usage:
     <CollapsibleGroup>
        <CollapsibleSection>
            <CollapsibleHeader>
                ### Title 1 
            </CollapsibleHeader>
            
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec pur

            :::caution
            this is a example of a caution block
            :::
    
        </CollapsibleSection>
        <CollapsibleSection>
        [...]
        </CollapsibleSection>
    </CollapsibleGroup>
    <CollapsibleGroup firstSectionExpanded={false}>
        [...]
    </CollapsibleGroup>
 */

export const CollapsibleHeader = ({ children, isActive }) => (
  <div className='collapsible-header'>
    {isActive ? <ExpandLess /> : <ExpandMore />}
    {children}
  </div>
);

export const CollapsibleSection = ({ activeId, setActiveId, id, children }) => {
  const isActive = id === activeId;
  const rootRef = useRef(null);
  const bodyRef = useRef(null);
  const { hash } = useLocation();
  const header = React.Children.toArray(children).find(
    (child) => child.type === CollapsibleHeader
  );

  const body = React.Children.toArray(children).filter(
    (child) => child.type !== CollapsibleHeader
  );

  const handleClick = (e) => {
    // Don’t toggle if the user clicked the built-in Docusaurus hash icon/link
    if (e.target.classList?.contains('hash-link')) return;
    setActiveId(isActive ? undefined : id);
  };

  // Find the first rendered heading inside this section (h1–h6) and read its id.
  const getHeadingId = () => {
    const el = rootRef.current;
    if (!el) return null;
    const heading = el.querySelector('h1, h2, h3, h4, h5, h6');
    return heading?.id || null;
  };

  // When the URL hash matches our heading id, open this section.
  useEffect(() => {
    if (!hash) return;
    const current = hash.replace(/^#/, '');
    const myHeadingId = getHeadingId();
    if (myHeadingId && current === myHeadingId) {
      setActiveId(id); // group will scroll after state update
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, id]);

  // Inactive bodies render with a plain boolean `hidden` (SSR-safe, keeps the content
  // in the HTML with no flash before hydration). On the client, upgrade them to
  // `hidden="until-found"` so the browser's find-in-page can reveal collapsed content.
  // React coerces the `hidden` prop to a boolean, so the string form is set on the node.
  useEffect(() => {
    const el = bodyRef.current;

    if (!el || isActive) {
      return;
    }

    el.setAttribute('hidden', 'until-found');
  }, [isActive]);

  // When find-in-page reveals a hidden body, open its section so our state and the
  // chevron stay in sync.
  useEffect(() => {
    const el = bodyRef.current;

    if (!el) {
      return;
    }

    const onBeforeMatch = () => setActiveId(id);

    el.addEventListener('beforematch', onBeforeMatch);

    return () => el.removeEventListener('beforematch', onBeforeMatch);
  }, [id, setActiveId]);

  return (
    <>
      {/* Keep your AnchorOffset if you want offset scrolling; optional */}
      <AnchorOffset
        id={`section-anchor-${id}`}
        className='section-anchor'
        offset='-80px'
      />
      <div
        id={`collapsible-section-${id}`}
        className='collapsible-section'
        ref={rootRef}
      >
        <Box
          onClick={handleClick}
          style={{ cursor: 'pointer', fontWeight: 'bold' }}
        >
          {React.cloneElement(header, { isActive })}
        </Box>
        {/* Always mount the body so its content is present in the server-rendered HTML
                (for crawlers, LLMs, and WebFetch). Inactive bodies are hidden via the
                `hidden` attribute (upgraded to `hidden="until-found"` on the client)
                instead of being unmounted. */}
        <div ref={bodyRef} className='collapsible-body' hidden={!isActive}>
          {body}
        </div>
      </div>
    </>
  );
};

/**
 *
 * @param {firstSectionExpanded} firstSectionExpanded
 * Is optional and is used to define if the first section should be expanded by default.
 * If not defined, the first section will be expanded by default.
 */
export const CollapsibleGroup = ({ children, firstSectionExpanded = true }) => {
  const componentId = useId();

  const getCurrentIdBasedOnIndex = (index) => {
    return `${componentId}-${index}`;
  };

  // Compute the section that should be open on first render, synchronously, so the
  // same markup is produced on the server and the client (no open/close flash) and
  // the default-open section's content is in the server-rendered HTML.
  const getDefaultActiveId = () => {
    if (!firstSectionExpanded) {
      return undefined;
    }

    let firstSectionIndex = null;

    React.Children.forEach(children, (child, index) => {
      if (child.type === CollapsibleSection && firstSectionIndex === null) {
        firstSectionIndex = index;
      }
    });

    return firstSectionIndex === null
      ? undefined
      : getCurrentIdBasedOnIndex(firstSectionIndex);
  };

  // state control for the open CollapsibleSection
  const [activeId, setActiveId] = useState(getDefaultActiveId);

  const scrollToSection = (id, behavior = 'instant', offset = -80) => {
    const element = document.querySelector(
      `#collapsible-section-${CSS.escape(id)}`
    );

    // Top position of the element with the offset, since the menu obscures the top of the section
    const y = element.getBoundingClientRect().top + window.scrollY + offset;

    window.scrollTo({ top: y, behavior: behavior });
  };

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
  };

  return (
    <>
      {/* Always render children so every section (headers and bodies) is present in
                the server-rendered HTML. Inactive bodies are mounted but hidden via CSS in
                CollapsibleSection, so crawlers, LLMs, and WebFetch can read all content. */}
      {React.Children.map(children, (child, index) => {
        if (child.type !== CollapsibleSection) {
          return child;
        }

        // Pass the activeId and setActiveId to the CollapsibleSection
        const cloneElement = React.cloneElement(child, {
          activeId,
          setActiveId: handleChangeActive,
          id: getCurrentIdBasedOnIndex(index),
          componentId,
        });

        return <div key={index + componentId}>{cloneElement}</div>;
      })}
    </>
  );
};

CollapsibleHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

CollapsibleSection.propTypes = {
  activeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
};

CollapsibleGroup.propTypes = {
  children: PropTypes.node.isRequired,
  firstSectionExpanded: PropTypes.bool,
};
