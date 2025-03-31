import styles from "./Tabuleiro.module.css";

const Tabuleiro = () => {
  const tamanho = 8;
  const tabuleiro = [];

  for (let linha = 0; linha < tamanho; linha++) {
    const casas = [];
    for (let coluna = 0; coluna < tamanho; coluna++) {
      const ehPreta = (linha + coluna) % 2 === 1;
      casas.push(
        <div
          key={`${linha}-${coluna}`}
          className={`${styles.casa} ${ehPreta ? styles.preta : styles.branca}`}
        >
          {/* Adicionando peças com cores específicas */}
          {linha < 3 && ehPreta && (
            <div className={`${styles.peca} ${styles.pecaAzul}`}></div>
          )}
          {linha > 4 && ehPreta && (
            <div className={`${styles.peca} ${styles.pecaVerde}`}></div>
          )}
        </div>
      );
    }
    tabuleiro.push(
      <div key={linha} className={styles.linha}>
        {casas}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Dama</h1>
      <div className={styles.tabuleiro}>{tabuleiro}</div>
    </div>
  );
};

export default Tabuleiro;
