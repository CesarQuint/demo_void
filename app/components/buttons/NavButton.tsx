import Image from "next/image";
import TypedLink from "../TypedLink/TypedLink";
import { useNavigation } from "@/app/utils/navigationContext";
import styles from "./NavButton.module.css";

export interface NavButtonProps {
    className?: string;
    href: string;
    text: string;
    icon?: string;
}

const NavButton: React.FC<NavButtonProps> = (props: NavButtonProps) => {
    const { setNavigationEvent } = useNavigation();

    return (
        <div className={props.className}>
            <TypedLink
                href={props.href}
                onClick={() =>
                    setNavigationEvent({ href: props.href, state: true })
                }
            >
                <div className={styles.NavButton}>
                    <span className={styles.NavButtonText}>
                        {props.text.toUpperCase()}
                    </span>
                    <span className={styles.NavButtonCircle}>
                        <Image
                            alt="arrow"
                            loading="lazy"
                            width="1000"
                            height="1000"
                            decoding="async"
                            data-nimg="1"
                            src={
                                props.icon ??
                                "/_next/static/media/wArrow.462f0480.svg"
                            }
                            style={{
                                color: "transparent",
                                height: "1rem",
                                width: "1rem",
                            }}
                        />
                    </span>
                </div>
            </TypedLink>
        </div>
    );
};

export default NavButton;
