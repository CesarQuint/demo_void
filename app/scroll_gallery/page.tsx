"use client";
import ScrollImg from "../components/ScrollImg/ScrollImg";
import styles from "../page.module.css";

export default function ScrollGallery() {
    const images = [
        "https://tympanus.net/Development/ConnectedGrid/img/14.jpg",
        "https://tympanus.net/Development/ConnectedGrid/img/15.jpg",
        "https://tympanus.net/Development/ConnectedGrid/img/16.jpg",
        "https://tympanus.net/Development/ConnectedGrid/img/17.jpg",
        "https://tympanus.net/Development/ConnectedGrid/img/18.jpg",
        "https://tympanus.net/Development/ConnectedGrid/img/19.jpg",
        "https://tympanus.net/Development/ConnectedGrid/img/20.jpg",
        "https://tympanus.net/Development/ConnectedGrid/img/21.jpg",
        "https://tympanus.net/Development/ConnectedGrid/img/22.jpg",
        "https://tympanus.net/Development/ConnectedGrid/img/23.jpg",
        "https://tympanus.net/Development/ConnectedGrid/img/24.jpg",
        "https://tympanus.net/Development/ConnectedGrid/img/25.jpg",
        "https://tympanus.net/Development/ConnectedGrid/img/26.jpg",
    ];

    return (
        <main className={styles.main}>
            <div className={styles.scrollView}>
                {images.map((src, i) => (
                    <ScrollImg
                        key={i}
                        src={src}
                        width={150}
                        height={150}
                        isLeftSide={!(i % 2)}
                        alt="example"
                        title="Raíces lumínicas"
                        caption="Instalación visual en el bosque"
                        date=""
                        tag=""
                    />
                ))}
            </div>
        </main>
    );
}
