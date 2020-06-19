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
    <StyledContainer hide={hide}>
      <img src={source} />
    </StyledContainer>
  );
};

export default VideoPreview;
