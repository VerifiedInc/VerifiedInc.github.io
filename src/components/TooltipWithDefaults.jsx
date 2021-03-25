import React from 'react';
import ReactTooltip from 'react-tooltip';

export default ({ children, ...props}) => (
  <ReactTooltip
    type="dark"
    place="top"
    effect="solid"
    multiline={true} // use <br> e.g. data-tip="Multiple <br> lines!"
    textColor="white"
    backgroundColor="#5e5e5e"
    delayHide={250}
    resizeHide={false} // don't hide when resizing page
    {...props}
  >
    {children}
  </ReactTooltip>
);
