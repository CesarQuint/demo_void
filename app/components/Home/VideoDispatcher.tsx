"use client";
import React, { useEffect, useState } from "react";
import useWindow from "@/app/utils/hooks/useWindow";
import VideoHover from "./videoHover";
import ThreedVideoDistortion from "../ThreeVideoDistortion/ThreeVideoDistortion";

interface VideoDispatcherProps {
    section: "home" | "about";
}

interface VideoSource {
    source: string;
    sourceMobile: string;
    thumbnail: string;
    thumbnailMobile: string;
}

const SOURCES: { home: VideoSource; about: VideoSource } = {
    home: {
        source: "/videos/voidxr-demo-eyecandy-home.mp4",
        thumbnail: "/videos/voidxr-demo-eyecandy-home-short.mp4",
        sourceMobile: "/videos/voidxr-demo-eyecandy-home-mobile.mp4",
        thumbnailMobile: "/videos/voidxr-demo-eyecandy-home-mobile.mp4",
    },
    about: {
        source: "/videos/voidxr-demo-processes.mp4",
        thumbnail: "/videos/voidxr-demo-procesos-short.mp4",
        sourceMobile: "/videos/voidxr-demo-processes.mp4",
        thumbnailMobile: "/videos/voidxr-demo-procesos-short.mp4",
    },
};

const VideoDispatcher = ({ section }: VideoDispatcherProps) => {
    const BASE_URL = process.env.NEXT_PUBLIC_VIDEO_SOURCES_BASE_URL;
    const windowStatus = useWindow();
    const [isWideWindow, setIsWideWindow] = useState(false);

    useEffect(() => {
        setIsWideWindow(
            windowStatus.innerWidth >= 428 && windowStatus.innerWidth !== 0,
        );
    }, [windowStatus.innerWidth]);

    return (
        <div>
            {isWideWindow ? (
                <ThreedVideoDistortion
                    source={BASE_URL + SOURCES[section].source}
                    thumbnail={BASE_URL + SOURCES[section].thumbnail}
                />
            ) : (
                <VideoHover
                    source={BASE_URL + SOURCES[section].sourceMobile}
                    thumbnail={BASE_URL + SOURCES[section].thumbnailMobile}
                />
            )}
        </div>
    );
};

export default VideoDispatcher;
