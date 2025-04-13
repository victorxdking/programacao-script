import styles from "../page.module.css";

export default function Display({ valorDisplay }) {
  return (
    <div className={styles.display}>
      {valorDisplay || "0"}
    </div>
  );
}
