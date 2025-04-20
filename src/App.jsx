import { useState, useEffect } from 'react';
import { loadKeymap } from './utils/loadKeymap';
import { parseZmk } from './utils/parseZmk';
import CorneKeyboard from './components/CorneKeyboard';
import { MoonIcon, SunIcon } from './components/Icons';
import TypingLevelDisplay from './components/TypingLevelDisplay';
import LevelCompleteModal from './components/Level/LevelCompleteModal';
import { levels } from './data/levels';

export function App() {
  const [keymap, setKeymap] = useState(null);
  const [currentLayer, setCurrentLayer] = useState('default');
  const [pressedKeys, setPressedKeys] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const [currentLevel, setLevelIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [levelResults, setLevelResults] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const [typedText, setTypedText] = useState('');
  const targetText = levels[currentLevel]?.textSamples[0] || '';
  const expectedKey = targetText[typedText.length]?.toLowerCase() || '';

  const [correctKeyCount, setCorrectKeyCount] = useState(0);
  const [totalKeyCount, setTotalKeyCount] = useState(0);

  // Cargar configuración al iniciar
  useEffect(() => {
    loadKeymap()
      .then(parseZmk)
      .then(setKeymap)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.code === 'Space' ? 'space' : e.key.toLowerCase();

      // Normalizar expectedKey para manejar espacios
      const normalizedExpectedKey = expectedKey === ' ' ? 'space' : expectedKey;

      // Actualizar las teclas presionadas
      setPressedKeys((prev) => [...prev, key]);

      // Incrementar el contador total de teclas presionadas
      setTotalKeyCount((prev) => prev + 1);

      // Validar la tecla presionada
      if (key === normalizedExpectedKey) {
        // Incrementar el contador de teclas correctas
        setCorrectKeyCount((prev) => prev + 1);

        // Procesar la tecla correcta después de un pequeño retraso
        setTimeout(() => {
          setTypedText((prev) => prev + (normalizedExpectedKey === 'space' ? ' ' : key)); // Agregar la tecla al texto escrito
          setPressedKeys((prev) => prev.filter((k) => k !== key)); // Eliminar la tecla presionada
        }, 100); // Retraso para permitir que el estado se actualice correctamente
      } else {
        // Si la tecla es incorrecta, eliminarla después de un tiempo
        setTimeout(() => {
          setPressedKeys((prev) => prev.filter((k) => k !== key));
        }, 200);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expectedKey]);

  // Aplicar tema oscuro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLevelComplete = (results) => {
    const precision = totalKeyCount > 0 ? (correctKeyCount / totalKeyCount) * 100 : 0;
    results.accuracy = precision.toFixed(2);

    console.log(`Nivel completado! WPM: ${results.wpm}, Precisión: ${results.accuracy}%`);
    setLevelResults(results); // Guardar resultados con precisión
    setShowModal(true); // Mostrar modal
  };

  const handleNextLevel = () => {
    setShowModal(false); // Ocultar modal
    setTypedText(''); // Reiniciar texto escrito
    setCorrectKeyCount(0); // Reiniciar contador de teclas correctas
    setTotalKeyCount(0); // Reiniciar contador total de teclas
    setLevelIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < levels.length) {
        console.log(`Avanzando al nivel ${nextIndex}`);
        return nextIndex;
      } else {
        console.log('¡Todos los niveles completados!');
        return prevIndex;
      }
    });
  };

  const handleRetryLevel = () => {
    setShowModal(false); // Ocultar modal
    setTypedText(''); // Reiniciar texto escrito
    setCorrectKeyCount(0); // Reiniciar contador de teclas correctas
    setTotalKeyCount(0); // Reiniciar contador total de teclas
    setRetryCount((prev) => prev + 1); // Incrementar el contador de reintentos
  };

  if (!keymap) return <div className="loading">Cargando teclado...</div>;

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            SplitTyping
          </h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-300"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="mb-4 flex justify-between items-center">
          <select
            value={currentLayer}
            onChange={(e) => setCurrentLayer(e.target.value)}
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-gray-800 dark:text-white"
          >
            {Object.keys(keymap.layers).map((layer) => (
              <option key={layer} value={layer}>
                {layer}
              </option>
            ))}
          </select>
        </div>

        <div>
          {showModal && (
            <LevelCompleteModal
              results={levelResults}
              onNextLevel={handleNextLevel}
              onRetryLevel={handleRetryLevel}
            />
          )}
        </div>

        <TypingLevelDisplay
          key={`${currentLevel}-${retryCount}`} // Clave única para forzar el reinicio
          level={levels[currentLevel]}
          onComplete={handleLevelComplete}
          darkMode={darkMode}
        />

        <CorneKeyboard
          pressedKeys={pressedKeys}
          keymap={keymap}
          currentLayer={currentLayer}
          darkMode={darkMode}
          expectedKey={expectedKey}
        />
      </main>
    </div>
  );
}