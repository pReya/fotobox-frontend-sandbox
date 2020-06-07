import React from "react";
import styles from "./capture-button.styl";

const CaptureButton = (): JSX.Element => {
  return (
    <span
      onClick={() => {
        console.log("Click");
        fetch("http://192.168.179.23:8080/picture").then((response) =>
          console.log("Response: ", response)
        );
      }}
      className={styles.outer}
    ></span>
  );
};

export default CaptureButton;
