import { useEffect, useState } from 'react';

export default function TypingLevelDisplay({
  level,
  onComplete,
  darkMode = false
}) {
  const [typedText, setTypedText] = useState('');
  const [targetText, setTargetText] = useState(level.textSamples[0]);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [levelCompleted, setLevelCompleted] = useState(false); // Nuevo estado

  useEffect(() => {
    if (typedText === targetText && !levelCompleted) {
      setLevelCompleted(true); // Marcar el nivel como completado
      onComplete?.({
        wpm,
        accuracy: calculateAccuracy(typedText, targetText),
        perfect: typedText === targetText
      });
    }
  }, [typedText, targetText, wpm, onComplete, levelCompleted]);

  // Calcula WPM
  useEffect(() => {
    if (typedText.length === 1) setStartTime(Date.now());
    if (typedText.length === targetText.length && startTime) {
      const minutes = (Date.now() - startTime) / 60000;
      const words = targetText.length / 5;
      setWpm(Math.round(words / minutes));
    }
  }, [typedText, targetText, startTime]);

  // Manejo de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      const expectedChar = targetText[typedText.length];

      if (e.key === expectedChar) {
        setTypedText(prev => prev + e.key);
      } else if (e.key === 'Backspace') {
        setTypedText(prev => prev.slice(0, -1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typedText, targetText]);

  // Verificar completado
  useEffect(() => {
    if (typedText === targetText && !levelCompleted) {
      setLevelCompleted(true); // Marcar el nivel como completado
      onComplete?.({
        wpm,
        accuracy: calculateAccuracy(typedText, targetText),
        perfect: typedText === targetText
      });
    }
  }, [typedText, targetText, wpm, onComplete, levelCompleted]);

  useEffect(() => {
    // Actualizar el texto objetivo cuando el nivel cambie
    setTargetText(level.textSamples[0]);
    setTypedText(''); // Reiniciar el texto escrito
    setLevelCompleted(false); // Reiniciar el estado de nivel completado
    setStartTime(null); // Reiniciar el tiempo de inicio
    setWpm(0); // Reiniciar WPM
  }, [level]);

  const calculateAccuracy = (typed, target) => {
    return Math.round((typed.length / target.length) * 100);
  };

  return (
    <div className={`typing-level-display ${darkMode ? 'dark' : ''}`}>
      {/* Encabezado del nivel */}
      <div className="level-header">
        <h2>{level.name}</h2>
        <div className="stats">
          <span>WPM: {wpm}</span>
          <span>Precisión: {calculateAccuracy(typedText, targetText)}%</span>
        </div>
      </div>

      {/* Área de texto interactiva */}
      <div className="typing-area">
        {targetText.split('').map((char, index) => {
          let state = '';
          if (index < typedText.length) {
            state = typedText[index] === char ? 'correct' : 'incorrect';
          } else if (index === typedText.length) {
            state = 'current';
          }
          return (
            <span
              key={index}
              className={`char ${state}`}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* Teclas objetivo */}
      <div className="target-keys">
        {level.targetKeys?.map(key => (
          <kbd key={key} className={`key ${typedText.includes(key) ? 'active' : ''}`}>
            {key.toUpperCase()}
          </kbd>
        ))}
      </div>
    </div>
  );
}