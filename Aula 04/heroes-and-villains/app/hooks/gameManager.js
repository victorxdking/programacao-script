'use client';
import { useEffect, useState } from 'react';

// Sons
const kame = new Audio('/kamehameha.swf.mp3');
const genki = new Audio('/genki-dama-1.mp3');
const teleport = new Audio('/dbz-teleport.mp3');
const eat = new Audio('/eat-323883.mp3');
const run = new Audio('/running-on-concrete-268478.mp3');
const vegetaSound = new Audio('/vegeta-final-flash.mp3');
const friezaSound = new Audio('/ataque-frieza.mp3');
const booSound = new Audio('/ataque-majin-boo.mp3');

// Lista de inimigos
const enemies = [
  {
    name: 'Vegeta',
    image: '/vegeta.png',
    sound: vegetaSound,
    attackName: 'Final Flash',
  },
  {
    name: 'Freeza',
    image: '/frieza.png',
    sound: friezaSound,
    attackName: 'Death Beam',
  },
  {
    name: 'Majin Boo',
    image: '/majin-boo.png',
    sound: booSound,
    attackName: 'Chocolate Beam',
  },
];

export default function useGameManager() {
  const [heroHP, setHeroHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [log, setLog] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [winner, setWinner] = useState('');
  const [heroAnimation, setHeroAnimation] = useState('');
  const [enemyAnimation, setEnemyAnimation] = useState('');
  const [seeds, setSeeds] = useState(1);
  const [enemyIndex, setEnemyIndex] = useState(0);
  const [blockedThisTurn, setBlockedThisTurn] = useState(false);
  const [vegetaPower, setVegetaPower] = useState(10);
  const [kamePower, setKamePower] = useState(10);

  const currentEnemy = enemies[enemyIndex];
  const nextEnemy = enemies[enemyIndex + 1];

  const updateLog = (msg) => setLog((prev) => [msg, ...prev]);

  function resetAnimations() {
    setHeroAnimation('');
    setEnemyAnimation('');
  }

  async function waitAudio(audio) {
    return new Promise((resolve) => {
      audio.currentTime = 0;
      audio.play();
      audio.onended = () => resolve();
    });
  }

  async function enemyTurn() {
    const audio = currentEnemy.sound;
    await waitAudio(audio);

    if (enemyHP <= 0 || winner) return;

    if (blockedThisTurn) {
      updateLog(`⚡ Ataque do ${currentEnemy.name} bloqueado pelo teleporte!`);
      setBlockedThisTurn(false);
      return;
    }

    let damage = currentEnemy.name === 'Vegeta' ? vegetaPower : 10;
    setHeroHP((prev) => Math.max(prev - damage, 0));
    updateLog(`👿 ${currentEnemy.name} lançou ${currentEnemy.attackName}! Dano: ${damage}`);

    if (currentEnemy.name === 'Vegeta') {
      setVegetaPower((prev) => prev + 5);
    }
  }

  async function handleHeroAction(action) {
    setDisabled(true);
    resetAnimations();

    switch (action) {
      case 'attack':
        setHeroAnimation('attack');
        updateLog(`💥 Goku usou o ataque!`);
        updateLog('Kamehamehaaaa!');
        await waitAudio(kame);
        setEnemyHP((prev) => Math.max(prev - kamePower, 0));
        setKamePower((prev) => prev + 10);
        break;

      case 'special':
        setHeroAnimation('special');
        updateLog('💥 Goku usou o ataque especial!');
        updateLog('Genki Damaaaa!');
        await waitAudio(genki);
        setEnemyHP((prev) => Math.max(prev - Math.floor(prev * 0.5), 0));
        break;

      case 'defend':
        setHeroAnimation('defend');
        updateLog('🌀 Goku se defendeu com teleporte!');
        await waitAudio(teleport);
        setBlockedThisTurn(true);
        break;

      case 'heal':
        if (seeds > 0) {
          setHeroAnimation('heal');
          updateLog('🍵 Goku usou uma Semente dos Deuses e recuperou 50 de vida!');
          await waitAudio(eat);
          setHeroHP((prev) => Math.min(prev + 50, 100));
          setSeeds((s) => s - 1);
        }
        break;

      case 'flee':
        updateLog('🏃 Goku tentou fugir!');
        await waitAudio(run);
        break;

      default:
        break;
    }

    await enemyTurn();
    setDisabled(false);
  }

  function resetGame() {
    setHeroHP(100);
    setEnemyHP(100);
    setLog([]);
    setWinner('');
    setDisabled(false);
    setHeroAnimation('');
    setEnemyAnimation('');
    setSeeds(1);
    setEnemyIndex(0);
    setVegetaPower(10);
    setKamePower(10);
  }

  useEffect(() => {
    if (enemyHP <= 0 && !winner) {
      if (enemyIndex < enemies.length - 1) {
        updateLog(`✅ ${currentEnemy.name} foi derrotado! Prepare-se para o próximo!`);
        setTimeout(() => {
          setEnemyIndex((i) => i + 1);
          setEnemyHP(100);
          setSeeds((s) => s + 1);
          if (currentEnemy.name === 'Vegeta') setVegetaPower(10);
        }, 1000);
      } else {
        setWinner('🎉 Você venceu o torneio! Goku é o grande campeão! 🏆');
      }
    }

    if (heroHP <= 0 && !winner) {
      setWinner(`${currentEnemy.name} venceu! 😈`);
    }
  }, [enemyHP, heroHP]);

  return {
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
  };
}
