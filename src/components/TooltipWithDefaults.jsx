import React from 'react';
import ReactTooltip from 'react-tooltip';

export default ({ children, ...props}) => (
  <ReactTooltip
    type="dark"
    place="top"
    effect="solid"
    multiline={true} // use <br> e.g. data-tip="Multiple <br> lines!"
    textColor="white"
    backgroundColor="#2e2e2e"
    arrowColor="transparent"
    delayHide={250}
    delayUpdate={250}
    resizeHide={false} // don't hide when resizing page
    {...props}
    className="tooltip"
    wrapper="span" // default is div, but this can't be a descendant of p so the browser throws an error
  >
    {children}
  </ReactTooltip>
);