import { classes } from "@/utils";
import styles from "./styles.module.scss";

// Toggle switch component
const Toggle = ({ value, onChange }: { value: boolean, onChange: () => void }) => {
    return (
        <div
            className={classes(styles.toggleContainer, value ? styles.toggleOn : styles.toggleOff)}
            onClick={onChange}
        >
            <div className={styles.toggleCircle}></div>
        </div>
    );
};

export default Toggle;
