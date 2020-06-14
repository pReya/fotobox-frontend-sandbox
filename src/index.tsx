import React, { useState } from "react";
import ReactDOM from "react-dom";

import CaptureButton from "./components/capture-button/capture-button";
import FullscreenPreview from "./components/fullscreen-preview/fullscreen-preview";

const App = (): JSX.Element => {
  const [preview, setPreview] = useState<string>("");

  return (
    <>
      <FullscreenPreview preview={preview} />
      <CaptureButton onRelease={(url) => setPreview(url)} />
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
