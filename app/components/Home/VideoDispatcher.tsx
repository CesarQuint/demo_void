import React, { useEffect } from "react";
import useWindow from "@/app/utils/hooks/useWindow";
import VideoHover from "./videoHover";
import ThreedVideoDistortion from "./ThreeVideoDistortion";

const VideoDispatcher = () => {
    const windowStatus = useWindow();
    useEffect(() => {}, [windowStatus.innerWidth]);
    return (
        <>
            {windowStatus.innerWidth >= 428 ? (
                <ThreedVideoDistortion />
            ) : (
                <VideoHover />
            )}
        </>
    );
};

export default VideoDispatcher;
