import React, { useState } from "react";
import clsx from "clsx";
import styles from "./capture-button.styl";

const CaptureButton = ({
  onRelease,
}: {
  onRelease: (url: string) => void;
}): JSX.Element => {
  const [isBusy, setIsBusy] = useState(false);

  const takePicture = () => {
    setIsBusy(true);
    fetch("http://192.168.179.23:8080/picture")
      .then((response) => {
        console.log("Response: ", response);
      })
      .catch((error) => {
        console.error("Error: ", error);
      })
      .finally(() => {
        setIsBusy(false);
        setTimeout(() => onRelease(""), 5000);
        onRelease("https://picsum.photos/seed/picsum/1920/1080");
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
