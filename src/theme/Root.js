import React from "react";
import ScrollToHash from '@site/src/components/ScrollToHash';


function Layout(props) {
  const { children } = props;

  return (
    <>
      {children}
      <ScrollToHash />
    </>
  );
}

export default Layout;