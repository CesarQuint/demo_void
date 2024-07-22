import { Fragment, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import s from "@/app/css/About/tabs.module.css";
import { TabData } from "@/app/constants/tabs_text";

import useWindow from "@/app/utils/hooks/useWindow";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Props {
  tabs: TabData[];
}

export default function Tabs({ tabs }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const [currentTab, setCurrentTab] = useState(0);
  const windowStatus = useWindow();

  useGSAP(
    () => {
      const tabs = gsap.utils.toArray(`.${s.tab}`);
      const titles = gsap.utils.toArray(`.${s.title}`);

      const isMobile = windowStatus.innerWidth <= 700;

      const tl = gsap
        .timeline({
          defaults: {
            ease: "power1",
            duration: 0.3,
          },
        })
        .to(tabs, { xPercent: -100 * currentTab }, 0);

      if (isMobile) {
        tl.set(`.${s.line}`, { width: "100%", xPercent: 0 }, 0).to(
          titles,
          {},
          0
        );
      } else {
        tl.set(`.${s.line}`, { width: `${100 / tabs.length}%` }, 0)
          .to(`.${s.line}`, { xPercent: 100 * currentTab }, 0)
          .set(titles, { xPercent: 0 }, 0);
      }
    },
    { scope: container, dependencies: [currentTab, windowStatus] }
  );

  return (
    <div ref={container} className={s.container}>
      <div className={s.header}>
        <div className={s.options}>
          {tabs.map((tab, i) => (
            <h3
              className={`${s.title} ${i === currentTab ? s.active : ""}`}
              key={i}
              onClick={() => setCurrentTab(i)}
            >
              {tab.title}
            </h3>
          ))}
        </div>

        <div className={s.line}></div>
      </div>

      <div className={s.scrollContainer}>
        {tabs.map((tab, i) => (
          <div
            key={i}
            className={`${s.tab} ${i === currentTab ? s.active : ""}`}
          >
            <p>
              {tab.content.map((txt, i) => (
                <Fragment key={i}>
                  <span>{txt}</span>
                  <br />
                  <br />
                </Fragment>
              ))}
            </p>
            <div className={s.number}>{`${i + 1}`.padStart(2, "0")}</div>
          </div>
        ))}
      </div>
      <div className={s.steps}>
        {tabs.map((_, i) => (
          <button
            key={i}
            className={`${s.step} ${i === currentTab ? s.active : ""}`}
            onClick={() => setCurrentTab(i)}
          ></button>
        ))}
      </div>
    </div>
  );
}
