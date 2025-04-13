import styles from "../page.module.css";

export default function Botoes({ valor, onClick, tipo = "numero" }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.botao} ${styles[tipo]}`}
    >
      {valor}
    </button>
  );
}
