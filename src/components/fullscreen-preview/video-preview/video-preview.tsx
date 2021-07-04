import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface VideoPreviewProps {
  readonly hide: boolean;
}

const StyledContainer = styled.div<VideoPreviewProps>`
  display: ${(props) => (props.hide ? "none" : "initial")};
`;

const VideoPreview: React.FunctionComponent<VideoPreviewProps> = ({
  hide,
}): JSX.Element => {
  const [source, setSource] = useState("");
  const backendUrl = process.env.BACKEND_URL;
  const backendPort = process.env.BACKEND_PORT;
  const fallbackStream = process.env.FALLBACK_STREAM;

  useEffect(() => {
    const streamUrl = `http://${backendUrl}:${backendPort}/`;
    const streamIsAvailable = `${streamUrl}status`;

    fetch(streamIsAvailable).then(
      (response) => {
        if (response.status === 200) {
          console.log("Found backend");
          setSource(streamUrl);
        } else {
          console.error("Backend not available – Using fallback stream");
          setSource(fallbackStream);
        }
      },
      () => {
        console.error(
          "Network error when trying to reach backend – Using fallback stream"
        );
        setSource(fallbackStream);
      }
    );
  }, []);

  return (
    <StyledContainer hide={hide}>
      <img src={source} />
    </StyledContainer>
  );
};

export default VideoPreview;
