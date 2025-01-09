"use client";
import { useState } from "react";
import { Project } from "../../../Strapi/interfaces/Entities/Project";
import styles from "./IntroductoryVideo.module.css";
import ThreedVideoDistortion from "../../Home/ThreeVideoDistortion";
import useWindow from "@/app/utils/hooks/useWindow";
import { useEffect } from "react";

type CaseStudyVideoProps = {
    data: Project["attributes"]["Case_Study_Video"]["data"];
};

const CaseStudyVideo: React.FC<CaseStudyVideoProps> = ({ data }) => {
    const windowStatus = useWindow();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const windH = windowStatus.innerWidth;

        if (windH <= 768) setIsMobile(true);

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [windowStatus]);

    return (
        <section>
            <div className={`${styles.mobileVideo}`}>
                <div className={styles.container}>
                    <video
                        autoPlay={true}
                        muted={true}
                        className={styles.video}
                        src={
                            process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL +
                            data.attributes.url
                        }
                        controls={true}
                    />
                </div>
                ;
            </div>
            <div className={`${styles.desktopVideo}`}>
                <ThreedVideoDistortion
                    sourceVideo={
                        process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL +
                        data.attributes.url
                    }
                />
            </div>
        </section>
    );
};

export default CaseStudyVideo;
