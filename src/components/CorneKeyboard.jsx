import { keyPositions } from '../data/keyPositions';

export default function CorneKeyboard({ pressedKeys, keymap, currentLayer, darkMode }) {
  const getKeyStyle = (isPressed) => {
    const baseStyle = {
      key: {
        fill: darkMode ? '#3B4252' : '#ECEFF4',
        stroke: darkMode ? '#4C566A' : '#D8DEE9'
      },
      text: {
        fill: darkMode ? '#E5E9F0' : '#2E3440'
      }
    };

    if (isPressed) {
      return {
        key: {
          fill: '#A3BE8C',
          stroke: '#8FBCBB'
        },
        text: {
          fill: '#2E3440'
        }
      };
    }
    return baseStyle;
  };

  return (
    <div className="keyboard-container">
      <svg width="900" height="500" viewBox="0 0 900 500">
        {keyPositions.map((key) => {
          const keyAction = keymap?.layers[currentLayer]?.[key.id]?.replace('&kp ', '') || key.label;
          const isPressed = pressedKeys.includes(keyAction.toLowerCase());
          const style = getKeyStyle(isPressed);

          return (
            <g
              key={key.id}
              transform={`translate(${key.x}, ${key.y}) ${key.rotate ? `rotate(${key.rotate})` : ''}`}
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
        })}
      </svg>
    </div>
  );
}