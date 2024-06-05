import GsapExample from "./utils/components/gsapExample";
import GsapInteraction from "./utils/components/gsapInteraction";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1>GSAP</h1>
        <section>
          <GsapExample />
          <GsapInteraction />
        </section>
      </div>
    </main>
  );
}
