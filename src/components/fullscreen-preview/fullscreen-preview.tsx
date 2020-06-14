import React from "react";

import VideoPreview from "./video-preview/video-preview";
import PicturePreview from "./picture-preview/picture-preview";

import styles from "./fullscreen-preview.styl";

const FullscreenPreview = ({ preview }: { preview: string }): JSX.Element => {
  return (
    <div className={styles.fullscreen}>
      {preview && <PicturePreview path={preview} />}
      <VideoPreview hide={Boolean(preview)} />
    </div>
  );
};

export default FullscreenPreview;
