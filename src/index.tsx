import React from "react";
import ReactDOM from "react-dom";

import VideoPreview from "./components/video-preview/video-preview";
import CaptureButton from "./components/capture-button/capture-button";

const App = (): JSX.Element => {
  return (
    <>
      <CaptureButton />
      <VideoPreview />
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
