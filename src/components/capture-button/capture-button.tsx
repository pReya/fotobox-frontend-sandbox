import React, { useState } from "react";
import styled from "styled-components";
import Loader from "./loader";

interface CaptureButtonProps {
  readonly onRelease: (url: string) => void;
}

const StyledContainer = styled.span<{ clickable: boolean }>`
  position: absolute;
  bottom: 8%;
  left: calc(50% - 50px);
  padding: 10px;
  width: 90px;
  height: 90px;
  border: 6px solid white;
  border-radius: 50%;
  background-color: white;
  background-clip: content-box;
  box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.3);
  cursor: ${({ clickable }) => (clickable ? "pointer" : "auto")};

  &:hover {
    background-color: ${({ clickable }) => (clickable ? "lightgrey" : "white")};
  }
`;

const CaptureButton: React.FunctionComponent<CaptureButtonProps> = ({
  onRelease,
}): JSX.Element => {
  const backendUrl = process.env.BACKEND_URL;
  const backendPort = process.env.BACKEND_PORT;
  const previewDurationMs = Number(process.env.PREVIEW_DURATION_MS);

  const [isBusy, setIsBusy] = useState(false);
  const [isShowingPreview, setIsShowingPreview] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(
    previewDurationMs / 1000
  );

  const takePicture = () => {
    setIsBusy(true);

    fetch(`http://${backendUrl}:${backendPort}/picture`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Response: ", data);
        onRelease(data.path);
      })
      .catch((error) => {
        console.error("Error: ", error);
        onRelease("https://picsum.photos/1920/1080");
      })
      .finally(() => {
        setIsBusy(false);
        setIsShowingPreview(true);
        setTimeout(() => {
          setIsShowingPreview(false);
          onRelease("");
        }, previewDurationMs);
      });
  };

  return (
    <StyledContainer
      clickable={!isBusy}
      {...(!isBusy && { onClick: takePicture })}
    >
      {isBusy && <Loader />}
      {isShowingPreview && <span>5 Sekunden</span>}
    </StyledContainer>
  );
};

export default CaptureButton;
