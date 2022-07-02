import React, { useContext } from "react";
import DataContext from "../Context";

function PageMasterer({ errorPage, defaultPage }) {
  const { hasAuth } = useContext(DataContext);

  return <div>{hasAuth ? defaultPage : errorPage}</div>;
}

export default PageMasterer;
