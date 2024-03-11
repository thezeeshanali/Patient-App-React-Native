import React from "react";

import ContextProvider from "./ContextProvider";
import Routes from "./Routes";
import AppLoader from "../components/AppLoader";
import ApolloAppProvider from "../ApolloAppProvider";

function AppProvider(props) {
  return (
    <ContextProvider>
      <ApolloAppProvider />
    </ContextProvider>
  );
}

export default AppProvider;
