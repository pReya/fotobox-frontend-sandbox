import React, { useState } from "react";
import styled from "styled-components";
import Loader from "./loader";

interface CaptureButtonProps {
  readonly onRelease: (url: string) => void;
}

const StyledSvgContainer = styled.div<{ clickable: boolean }>`
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 8%;
  box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.3);

  #centerCircle {
    fill: white;
    cursor: ${({ clickable }) => (clickable ? "pointer" : "auto")};
  }

  #centerCircle:hover {
    fill: ${({ clickable }) => (clickable ? "red" : "white")};
    cursor: ${({ clickable }) => (clickable ? "pointer" : "auto")};
  }
`;

const CaptureButton: React.FunctionComponent<CaptureButtonProps> = ({
  onRelease,
}): JSX.Element => {
  const [isBusy, setIsBusy] = useState(false);
  const backendUrl = process.env.BACKEND_URL;
  const backendPort = process.env.BACKEND_PORT;

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
        setTimeout(() => {
          onRelease("");
          setIsBusy(false);
        }, 5000);
      });
  };

  return (
    <>
      <StyledSvgContainer
        clickable={!isBusy}
        {...(!isBusy && { onClick: takePicture })}
      >
        <svg height="120" width="120">
          <circle
            stroke-width="1"
            fill="transparent"
            stroke="white"
            strokeWidth="6"
            r="56"
            cx="60"
            cy="60"
          ></circle>
          <circle
            id="centerCircle"
            fill="white"
            r="48"
            cx="60"
            cy="60"
          ></circle>
        </svg>
      </StyledSvgContainer>
      {isBusy && <Loader />}
    </>
  );
};

export default CaptureButton;
