import React from 'react';
import PropTypes from 'prop-types';

/**
 * AnchorOffset Component
 * ----------------------
 * This component creates an invisible anchor element to handle scrolling offsets
 * for navigation links. When a link with a corresponding `id` is clicked, the browser
 * scrolls to this element. The `top` style ensures the scroll position is adjusted
 * to account for fixed headers or other UI elements.
 *
 * Props:
 * - id (string): The unique identifier for the anchor.
 * - offset (string): The vertical offset to apply (default: '-70px').
 *
 * Usage Example:
 * <AnchorOffset id="my-anchor-id" offset="-150px" />
 *
 * Styles:
 * - `position: relative; top: offset`: Moves the scroll position by the specified amount.
 * - `visibility: hidden`: Ensures the element is not visible.
 * - `height: 0`: Prevents the element from affecting layout.
 */
const AnchorOffset = ({ id, offset = '-70px' }) => (
  <div
    id={id}
    style={{
      position: 'relative',
      top: offset,
      visibility: 'hidden',
      height: '0',
    }}
  />
);

AnchorOffset.propTypes = {
  id: PropTypes.string.isRequired,
  offset: PropTypes.string,
};

export default AnchorOffset;