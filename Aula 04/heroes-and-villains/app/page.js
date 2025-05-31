'use client';
import useGameManager from '@/app/hooks/gameManager';

export default function Home() {
  const {
    heroHP,
    enemyHP,
    log,
    disabled,
    winner,
    heroAnimation,
    enemyAnimation,
    currentEnemy,
    nextEnemy,
    seeds,
    handleHeroAction,
    resetGame,
  } = useGameManager();

  return (
    <div className="fight-screen">
      {/* Barras de Vida + Nome */}
      <div className="top-bar">
        <div className="life-container">
          <div className="life-text">Goku</div>
          <div className="life-fill" style={{ width: `${heroHP}%` }}></div>
        </div>
        <div className="ko-text">KO</div>
        <div className="life-container">
          <div className="life-fill" style={{ width: `${enemyHP}%` }}></div>
          <div className="life-text">{currentEnemy.name}</div>
        </div>
        {nextEnemy && (
          <div className="next-opponent">
            <p>🔜 Próximo: <strong>{nextEnemy.name}</strong></p>
            <img src={nextEnemy.image} alt={nextEnemy.name} />
          </div>
        )}
      </div>

      {/* Arena de luta */}
      <div className="arena">
        <img src="/goku.png" className={`fighter left ${heroAnimation}`} alt="Goku" />
        <img src={currentEnemy.image} className={`fighter right ${enemyAnimation}`} alt={currentEnemy.name} />
      </div>

      {/* Resultado ou Controles */}
      {winner ? (
        <div className="result-box">
          <h2 className="winner-text">{winner}</h2>
          <button onClick={resetGame}>🔁 Reiniciar Jogo</button>
        </div>
      ) : (
        <div className="controls">
          <button disabled={disabled} onClick={() => handleHeroAction('attack')}>🥊 Atacar</button>
          <button disabled={disabled} onClick={() => handleHeroAction('special')}>💥 Ataque Especial</button>
          <button disabled={disabled} onClick={() => handleHeroAction('defend')}>🛡️ Defender</button>
          <button disabled={disabled} onClick={() => handleHeroAction('heal')}>
            🌱 Usar Semente ({seeds})
          </button>
          <button disabled={disabled} onClick={() => handleHeroAction('flee')}>🏃 Correr</button>
        </div>
      )}

      {/* Histórico de ações */}
      <div className="log">
        <h2>Histórico:</h2>
        <ul>
          {log.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
