import Image from "next/image";
import styles from "../../../css/Form/form.module.css";
import arrow from "../../../../public/images/wArrow.svg";
import wArrow from "../../../../public/images/arrow.svg";

export const ReturnButtons = ({
    returnHandler,
}: {
    returnHandler: () => void;
}) => {
    return (
        <>
            <button
                onClick={() => {
                    returnHandler();
                }}
                className={styles.white_button}
            >
                <Image
                    style={{
                        width: "2vw",
                        height: "2vh",
                        backgroundColor: " #ededed",
                        transform: "rotate(180deg)",
                    }}
                    width={1000}
                    height={1000}
                    src={arrow}
                    alt="arrow"
                />
            </button>
            <button
                onClick={() => {
                    returnHandler();
                }}
                className={styles.white_button}
            >
                REGRESAR
            </button>
        </>
    );
};

export const ContinueButtons = ({
    clickHandler,
    text = "CONTINUAR",
}: {
    clickHandler: () => void;
    text?: string;
}) => {
    return (
        <>
            <button
                onClick={() => clickHandler()}
                style={{ padding: "1rem", borderRadius: "40px" }}
                className={styles.black_button}
            >
                {text}
            </button>
            <button
                onClick={() => clickHandler()}
                style={{
                    padding: "10px",
                    borderRadius: "50%",
                }}
                className={styles.black_button}
            >
                <Image
                    className={styles.arrow_button}
                    width={1000}
                    height={1000}
                    src={wArrow}
                    alt="arrow"
                />
            </button>
        </>
    );
};
