import React from "react";
import styles from "./video-preview.styl";

const VideoPreview = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <img src="http://climatecam.gi.alaska.edu/mjpg/video.mjpg" />
    </div>
  );
};

export default VideoPreview;
