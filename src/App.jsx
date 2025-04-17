import { useState, useEffect } from 'react';
import { loadKeymap } from './utils/loadKeymap';
import { parseZmk } from './utils/parseZmk';
import CorneKeyboard from './components/CorneKeyboard';

export function App() {
  const [keymap, setKeymap] = useState(null);
  const [currentLayer, setCurrentLayer] = useState('default');
  const [pressedKeys, setPressedKeys] = useState([]);

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

  if (!keymap) return <div>Cargando teclado...</div>;

  return (
    <main>
      <h1>Entrenador para Corne Keyboard</h1>

      <select
        value={currentLayer}
        onChange={(e) => setCurrentLayer(e.target.value)}
      >
        {Object.keys(keymap.layers).map(layer => (
          <option key={layer} value={layer}>{layer}</option>
        ))}
      </select>

      <CorneKeyboard
        pressedKeys={pressedKeys}
        keymap={keymap}
        currentLayer={currentLayer}
      />

      <div className="debug">
        <pre>Layer actual: {currentLayer}</pre>
      </div>
    </main>
  );
}