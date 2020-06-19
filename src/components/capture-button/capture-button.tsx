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
  const [isBusy, setIsBusy] = useState(false);

  const takePicture = () => {
    setIsBusy(true);
    setTimeout(() => {
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
    }, 2000);
  };

  return (
    <StyledContainer
      clickable={!isBusy}
      {...(!isBusy && { onClick: takePicture })}
    >
      {isBusy && <Loader />}
    </StyledContainer>
  );
};

export default CaptureButton;
