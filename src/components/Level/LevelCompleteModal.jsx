export default function LevelCompleteModal({ results, onNextLevel }) {
  const { wpm, accuracy, perfect } = results;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>¡Nivel Completado!</h2>
        <div className="results">
          <p>WPM: <span>{wpm}</span></p>
          <p>Precisión: <span>{accuracy}%</span></p>
          <p>{perfect ? "¡Perfecto!" : "¡Buen trabajo!"}</p>
        </div>
        <button onClick={onNextLevel} className="next-level-button">
          Continuar al siguiente nivel
        </button>
      </div>
    </div>
  );
}