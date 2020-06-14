import React from "react";

const PicturePreview = ({ path }: { path: string }): JSX.Element | null => {
  return path ? <img src={path} /> : null;
};

export default PicturePreview;
