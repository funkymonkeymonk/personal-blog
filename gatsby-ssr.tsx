import * as React from "react";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";

import { store } from "./src/store";

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const ConnectedBody = () => (
    <Provider store={store}>
      {bodyComponent}
    </Provider>
  );
  replaceBodyHTMLString(renderToString(<ConnectedBody />));
};
