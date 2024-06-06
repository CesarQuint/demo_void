import GsapExample from "../components/gsapComponents/gsapExample";
import GsapInteraction from "../components/gsapComponents/gsapInteraction";

import styles from "../page.module.css";

type Props = {};

export default function FirstProject() {
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
