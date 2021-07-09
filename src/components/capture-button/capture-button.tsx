import React, { useState } from "react";
import styled from "styled-components";
import Loader from "./loader";

interface CaptureButtonProps {
  readonly onRelease: (url: string) => void;
}

const ControlBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 8%;
`;

const StyledSvgContainer = styled.div<{ clickable: boolean }>`
  svg {
    filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.6));
  }

  #innerCircle {
    fill: ${({ clickable }) => (clickable ? "white" : "lightgrey")};
    cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
  }

  #innerCircle:hover {
    fill: ${({ clickable }) => (clickable ? "lightgrey" : "white")};
    cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
  }
`;

const TimerContainer = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  color: white;
  font-weight: 700;
  font-size: 2em;
  gap: 20px;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.6);
`;

const TimerValue = styled.div<{ active: boolean }>`
  color: ${({ active }) => (active ? "red" : "white")};
  cursor: ${({ active }) => (active ? "default" : "pointer")};
`;

const CaptureButton: React.FunctionComponent<CaptureButtonProps> = ({
  onRelease,
}): JSX.Element => {
  const [isBusy, setIsBusy] = useState(false);
  const [progress, setProgress] = useState(null);
  const [timerInterval, setTimerInterval] = useState<number>(0);
  const backendUrl = process.env.BACKEND_URL;
  const backendPort = process.env.BACKEND_PORT;

  const toggleTimerInterval = (interval: number) => {
    if (interval === timerInterval) {
      setTimerInterval(0);
    } else {
      setTimerInterval(interval);
    }
  };

  const takePicture = () => {
    setIsBusy(true);

    setTimeout(() => {
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
    }, timerInterval);
  };

  const radius = 56;
  const circumference = radius * 2 * Math.PI;

  return (
    <ControlBarContainer>
      <div></div>
      <StyledSvgContainer
        clickable={!isBusy}
        {...(!isBusy && { onClick: takePicture })}
      >
        <svg height="120" width="120">
          <circle
            id="outerCircle"
            fill="transparent"
            stroke="white"
            strokeWidth="6"
            {...(progress
              ? {
                  strokeDasharray: `${circumference} ${circumference}`,
                  strokeDashoffset: `${
                    circumference - (progress / 100) * circumference
                  }`,
                }
              : {})}
            r={radius}
            cx="60"
            cy="60"
          ></circle>
          <circle id="innerCircle" r="48" cx="60" cy="60"></circle>
        </svg>
      </StyledSvgContainer>
      {/* {isBusy && <Loader />} */}
      <TimerContainer>
        <TimerValue
          active={timerInterval === 3000}
          onClick={() => toggleTimerInterval(3000)}
        >
          3s
        </TimerValue>
        <TimerValue
          active={timerInterval === 5000}
          onClick={() => toggleTimerInterval(5000)}
        >
          5s
        </TimerValue>
        <TimerValue
          active={timerInterval === 10000}
          onClick={() => toggleTimerInterval(10000)}
        >
          10s
        </TimerValue>
      </TimerContainer>
    </ControlBarContainer>
  );
};

export default CaptureButton;
