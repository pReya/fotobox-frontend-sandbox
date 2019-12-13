import React from "react";
import ReactDOM from "react-dom";

import VideoPreview from "./components/video-preview/video-preview";

const App = (): JSX.Element => {
  return <VideoPreview />;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
