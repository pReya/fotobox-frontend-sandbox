import React, { useState } from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";

import CaptureButton from "./components/capture-button/capture-button";
import FullscreenPreview from "./components/fullscreen-preview/fullscreen-preview";

const GlobalStyle = createGlobalStyle`
  html {
    margin: 0;
    background-color: black;
    font-family: sans-serif;
  }
`;

const App = (): JSX.Element => {
  const [preview, setPreview] = useState<string>("");

  return (
    <>
      <GlobalStyle />
      <FullscreenPreview preview={preview} />
      <CaptureButton onRelease={(url) => setPreview(url)} />
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
