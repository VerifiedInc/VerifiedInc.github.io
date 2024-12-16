import React from "react";
import ScrollToHash from '@site/src/components/ScrollToHash';


function Layout(props) {
  const { children } = props;
  console.log('hello')

  return (
    <>
      {children}
      <ScrollToHash />
    </>
  );
}

export default Layout;