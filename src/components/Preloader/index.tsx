import styles from "./styles.module.scss";

function Preloader(props: { className?: string }) {
    const { className } = props;

    return (
        <div className={styles["lds-ellipsis"] + " " + (className || "")}>
            <div className={styles.lds__ellipsis_container}>
                {Array(4).fill("").map((_, index) => (
                        <div key={index} />
                    ))
                }
            </div>
        </div>
    );
}

export default Preloader;