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

  // Start with the first level in the "home" group
  const [currentGroup, setCurrentGroup] = useState('home');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const currentLevel = levels[currentGroup][currentLevelIndex];

  const [showModal, setShowModal] = useState(false);
  const [levelResults, setLevelResults] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const [typedText, setTypedText] = useState('');
  const targetText = currentLevel?.textSamples[0] || '';
  const expectedKey = targetText[typedText.length]?.toLowerCase() || '';

  const [correctKeyCount, setCorrectKeyCount] = useState(0);
  const [totalKeyCount, setTotalKeyCount] = useState(0);

  // Load keymap on initialization
  useEffect(() => {
    loadKeymap()
      .then(parseZmk)
      .then(setKeymap)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.code === 'Space' ? 'space' : e.key.toLowerCase();

      // Normalize expectedKey for spaces
      const normalizedExpectedKey = expectedKey === ' ' ? 'space' : expectedKey;

      // Update pressed keys
      setPressedKeys((prev) => [...prev, key]);

      // Increment total key count
      setTotalKeyCount((prev) => prev + 1);

      // Validate the pressed key
      if (key === normalizedExpectedKey) {
        // Increment correct key count
        setCorrectKeyCount((prev) => prev + 1);

        // Process correct key after a small delay
        setTimeout(() => {
          setTypedText((prev) => prev + (normalizedExpectedKey === 'space' ? ' ' : key));
          setPressedKeys((prev) => prev.filter((k) => k !== key));
        }, 100);
      } else {
        // Remove incorrect key after a small delay
        setTimeout(() => {
          setPressedKeys((prev) => prev.filter((k) => k !== key));
        }, 200);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expectedKey]);

  const handleLevelComplete = (results) => {
    const precision = totalKeyCount > 0 ? (correctKeyCount / totalKeyCount) * 100 : 0;
    results.accuracy = precision.toFixed(2);
    results.currentLevel = currentLevel;
    results.totalLevels = levels[currentGroup].length;

    console.log(`Nivel completado! WPM: ${results.wpm}, Precisión: ${results.accuracy}%`);
    setLevelResults(results);
    setShowModal(true);
  };

  const handleNextLevel = () => {
    setShowModal(false);
    setTypedText('');
    setCorrectKeyCount(0);
    setTotalKeyCount(0);

    if (currentLevelIndex + 1 < levels[currentGroup].length) {
      setCurrentLevelIndex((prev) => prev + 1);
    } else {
      console.log('¡Todos los niveles completados en este grupo!');
    }
  };

  const handleRetryLevel = () => {
    setShowModal(false);
    setTypedText('');
    setCorrectKeyCount(0);
    setTotalKeyCount(0);
    setRetryCount((prev) => prev + 1);
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
            onClick={(e) => {
              setDarkMode(!darkMode);
              e.target.blur(); // Remove focus from the button
            }}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-yellow-300"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div>
          {showModal && (
            <LevelCompleteModal
              results={levelResults}
              levels={levels[currentGroup]}
              onNextLevel={handleNextLevel}
              onRetryLevel={handleRetryLevel}
            />
          )}
        </div>

        <TypingLevelDisplay
          level={currentLevel}
          levels={levels[currentGroup]}
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