import { useState, useEffect } from 'react';
import { loadKeymap } from './utils/loadKeymap';
import { parseZmk } from './utils/parseZmk';
import CorneKeyboard from './components/CorneKeyboard';
import { MoonIcon, SunIcon } from './components/Icons'; // Crea estos componentes

export function App() {
  const [keymap, setKeymap] = useState(null);
  const [currentLayer, setCurrentLayer] = useState('default');
  const [pressedKeys, setPressedKeys] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Cargar configuración al iniciar
  useEffect(() => {
    loadKeymap()
      .then(parseZmk)
      .then(setKeymap)
      .catch(console.error);
  }, []);

  // Manejar pulsaciones de teclas
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      setPressedKeys(prev => [...prev, key]);
      setTimeout(() => {
        setPressedKeys(prev => prev.filter(k => k !== key));
      }, 200);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Aplicar tema oscuro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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
            {Object.keys(keymap.layers).map(layer => (
              <option key={layer} value={layer}>{layer}</option>
            ))}
          </select>
        </div>

        <CorneKeyboard
          pressedKeys={pressedKeys}
          keymap={keymap}
          currentLayer={currentLayer}
          darkMode={darkMode}
        />
      </main>
    </div>
  );
}