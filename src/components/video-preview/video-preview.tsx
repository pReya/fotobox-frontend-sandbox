import React, { useEffect, useState } from "react";
import styles from "./video-preview.styl";

const VideoPreview = (): JSX.Element => {
  const [source, setSource] = useState(
    "http://climatecam.gi.alaska.edu/mjpg/video.mjpg"
  );

  useEffect(() => {
    const backendIp = "http://192.168.179.23:8080/";

    fetch(backendIp).then((response) => {
      if (response.status === 200) {
        console.log("Found backend");
        setSource(backendIp);
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <img src={source} />
    </div>
  );
};

export default VideoPreview;
