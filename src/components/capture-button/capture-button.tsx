import React, { useState } from "react";
import clsx from "clsx";
import styles from "./capture-button.styl";

const CaptureButton = (): JSX.Element => {
  const [isBusy, setIsBusy] = useState(false);

  const takePicture = () => {
    setIsBusy(true);
    fetch("http://192.168.179.23:8080/picture")
      .then((response) => {
        console.log("Response: ", response);
        setIsBusy(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsBusy(false);
      });
  };

  return (
    <span
      onClick={takePicture}
      className={clsx(styles.outer, !isBusy && styles.clickable)}
    >
      {isBusy && <div className={styles.loader}>Loading...</div>}
    </span>
  );
};

export default CaptureButton;
