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
        source: "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/videos/voidxr-demo-eyecandy-home.mp4",
        thumbnail:
            "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/videos/voidxr-demo-eyecandy-home-short.mp4",
        sourceMobile:
            "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/thumbnails/VOIDXR%20DEMO%20EYECANDY%20Thumbnail%20movil.png",
        thumbnailMobile:
            "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/videos/voidxr-demo-eyecandy-home-mobile.mp4",
    },
    about: {
        source: "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/videos/voidxr-demo-processes.mp4",
        thumbnail:
            "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/videos/voidxr-demo-procesos-short.mp4",
        sourceMobile:
            "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/videos/voidxr-demo-processes.mp4",
        thumbnailMobile:
            "https://voidxr-digital-assets.nyc3.cdn.digitaloceanspaces.com/videos/voidxr-demo-procesos-short.mp4",
    },
};

const VideoDispatcher = ({ section }: VideoDispatcherProps) => {
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
                    source={SOURCES[section].source}
                    thumbnail={SOURCES[section].thumbnail}
                />
            ) : (
                <VideoHover
                    source={SOURCES[section].sourceMobile}
                    thumbnail={SOURCES[section].thumbnailMobile}
                />
            )}
        </div>
    );
};

export default VideoDispatcher;
