import React from "react";
import styled from "styled-components";

import VideoPreview from "./video-preview/video-preview";
import PicturePreview from "./picture-preview/picture-preview";

const StyledContainer = styled.div`
  overflow: hidden;

  & img {
    position: fixed;
    max-height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const FullscreenPreview = ({ preview }: { preview: string }): JSX.Element => {
  return (
    <StyledContainer>
      {preview && <PicturePreview path={preview} />}
      <VideoPreview hide={Boolean(preview)} />
    </StyledContainer>
  );
};

export default FullscreenPreview;
