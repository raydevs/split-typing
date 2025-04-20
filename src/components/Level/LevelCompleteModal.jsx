import { useEffect, useRef } from 'react';

export default function LevelCompleteModal({ results, onNextLevel, onRetryLevel }) {
  const { wpm, accuracy, perfect } = results;
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
          <p>WPM: <span>{wpm}</span></p>
          <p>Precisión: <span>{accuracy}%</span></p>
          <p>{perfect ? "¡Perfecto!" : "¡Buen trabajo!"}</p>
        </div>
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