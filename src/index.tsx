import React from "react";
import ReactDOM from "react-dom";
import styles from "./styles";
import VideoPreview from "./components/video-preview/video-preview";

const App = (): JSX.Element => {
  return (
    <>
      <div className={styles.red}>
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
      <VideoPreview />
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
