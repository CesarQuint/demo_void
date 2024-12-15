"use client";
import React, { useEffect } from "react";
import useWindow from "@/app/utils/hooks/useWindow";
import VideoHover from "./videoHover";
import ThreedVideoDistortion from "./ThreeVideoDistortion";

const VideoDispatcher = () => {
    const windowStatus = useWindow();
    useEffect(() => {}, [windowStatus.innerWidth]);
    return (
        <div>
            {windowStatus.innerWidth >= 428 && windowStatus.innerWidth !== 0 ? (
                <ThreedVideoDistortion />
            ) : (
                <VideoHover />
            )}
        </div>
    );
};

export default VideoDispatcher;
