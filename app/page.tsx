import GsapExample from "./components/gsapExample";
import GsapInteraction from "./components/gsapInteraction";

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
