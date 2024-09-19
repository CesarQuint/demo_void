import { Project } from "../../../Strapi/interfaces/Entities/Project"
import styles from './IntroductoryVideo.module.css';

type CaseStudyVideoProps = { data: Project['attributes']['Case_Study_Video']['data'] }

const CaseStudyVideo: React.FC<CaseStudyVideoProps> = ({ data }) => (
    <section>
        <div className={styles.container}>
            <video
                autoPlay={true}
                muted={true}
                className={styles.video}
                src={process.env.NEXT_PUBLIC_STRAPI_BASE_URL + data.attributes.url}
                controls={true}
            />
        </div>
    </section>
);

export default CaseStudyVideo;
