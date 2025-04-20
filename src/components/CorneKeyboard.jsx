import { keyPositions } from '../data/keyPositions';

const COLORS = {
  default: { fill: '#ECEFF4', stroke: '#D8DEE9' },
  dark: { fill: '#3B4252', stroke: '#4C566A' },
  correct: { fill: '#4ADE80', stroke: '#16A34A' },
  expected: { fill: '#3B82F6', stroke: '#2563EB' },
  error: { fill: '#EF4444', stroke: '#B91C1C' },
  textDefault: { light: '#2E3440', dark: '#E5E9F0' },
};

const getKeyStyle = (keyAction, isPressed, expectedKey, darkMode) => {
  const normalizedKeyAction = keyAction?.toLowerCase();
  const normalizedExpectedKey = expectedKey?.toLowerCase();

  const baseStyle = {
    key: darkMode ? COLORS.dark : COLORS.default,
    text: { fill: darkMode ? COLORS.textDefault.dark : COLORS.textDefault.light },
  };

  // Espacio
  if (normalizedKeyAction === 'space') {
    if (normalizedExpectedKey === ' ') {
      return isPressed
        ? { key: COLORS.correct, text: { fill: '#FFFFFF' } }
        : { key: COLORS.expected, text: { fill: '#FFFFFF' } };
    }
    return isPressed
      ? { key: COLORS.error, text: { fill: '#FFFFFF' }, animation: 'shake' }
      : baseStyle;
  }

  // Correct key pressed
  if (isPressed && normalizedKeyAction === normalizedExpectedKey) {
    return { key: COLORS.correct, text: { fill: '#FFFFFF' } };
  }

  // Incorrect key pressed
  if (isPressed) {
    return { key: COLORS.error, text: { fill: '#FFFFFF' }, animation: 'shake' };
  }

  // Expected key (not pressed)
  if (normalizedKeyAction === normalizedExpectedKey) {
    return { key: COLORS.expected, text: { fill: '#FFFFFF' } };
  }

  return baseStyle;
};

export default function CorneKeyboard({ pressedKeys, keymap, currentLayer, darkMode, expectedKey }) {
  const renderKey = (key) => {
    const keyAction = keymap?.layers[currentLayer]?.[key.id]?.replace('&kp ', '') || key.label;
    const normalizedKeyAction = keyAction?.toLowerCase();
    const isPressed = pressedKeys.includes(normalizedKeyAction);
    const style = getKeyStyle(keyAction, isPressed, expectedKey, darkMode);

    return (
      <g
        key={key.id}
        transform={`translate(${key.x}, ${key.y}) ${key.rotate ? `rotate(${key.rotate})` : ''}`}
        className={style.animation ? style.animation : ''}
      >
        <rect
          width={key.width || 52}
          height={key.height || 52}
          rx="6"
          fill={style.key.fill}
          stroke={style.key.stroke}
          strokeWidth="2"
        />
        <text
          x={(key.width || 52) / 2}
          y={(key.height || 52) / 2 + 5}
          fill={style.text.fill}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14px"
          fontWeight="bold"
          fontFamily="'SFMono-Regular', monospace"
        >
          {keyAction}
        </text>
      </g>
    );
  };

  return (
    <div className="keyboard-container">
      <svg width="900" height="500" viewBox="0 0 900 500">
        {keyPositions.map(renderKey)}
      </svg>
    </div>
  );
}