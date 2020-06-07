import React from "react";
import styles from "./video-preview.styl";

const VideoPreview = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <img src="http://192.168.179.23:8080/" />
    </div>
  );
};

export default VideoPreview;
