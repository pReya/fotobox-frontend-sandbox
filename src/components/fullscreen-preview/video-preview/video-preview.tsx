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
  const { BACKEND_URL: backendUrl, BACKEND_PORT: backendPort } = process.env;

  useEffect(() => {
    const streamUrl = `http://${backendUrl}:${backendPort}/`;
    const streamIsAvailable = `${streamUrl}status`;

    fetch(streamIsAvailable).then((response) => {
      if (response.status === 200) {
        console.log("Found backend");
        setSource(streamUrl);
      } else {
        console.error("Found no backend – Fallback stream");
        setSource("http://climatecam.gi.alaska.edu/mjpg/video.mjpg");
      }
    });
  }, []);

  return (
    <StyledContainer hide={hide}>
      <img src={source} />
    </StyledContainer>
  );
};

export default VideoPreview;
