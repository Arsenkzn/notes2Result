import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import App from "./app/App";
import { theme } from "./app/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <title>macos-notes</title>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
