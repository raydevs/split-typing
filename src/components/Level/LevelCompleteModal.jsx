import { useEffect, useRef } from 'react';
import LevelProgress from './LevelProgress';

export default function LevelCompleteModal({ results, levels, onNextLevel, onRetryLevel }) {

  const nextLevelButtonRef = useRef(null);

  useEffect(() => {
    // Poner el foco en el botón de "Continuar al siguiente nivel"
    if (nextLevelButtonRef.current) {
      nextLevelButtonRef.current.focus();
    }
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>¡Nivel Completado!</h2>
        <div className="results">
          <p>WPM: <span>{results.wpm}</span></p>
          <p>Precisión: <span>{results.accuracy}%</span></p>
          <p>{results.perfect ? "¡Perfecto!" : "¡Buen trabajo!"}</p>
        </div>
        <LevelProgress currentLevel={results.currentLevel} levels={levels} />
        <div className="modal-buttons">
          <button onClick={onRetryLevel} className="retry-level-button">
            Reintentar nivel
          </button>
          <button
            onClick={onNextLevel}
            className="next-level-button"
            ref={nextLevelButtonRef}
          >
            Continuar al siguiente nivel
          </button>
        </div>
      </div>
    </div>
  );
}