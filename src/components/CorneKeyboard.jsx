import { keyPositions } from '../data/keyPositions';
import corneSvg from '/corne.svg';

export default function CorneKeyboard({ pressedKeys, keymap, currentLayer }) {
  return (
    <div className="keyboard-container" style={{ position: 'relative', width: '900px', height: '500px' }}>
      <svg
        width="900"
        height="500"
        viewBox="0 0 900 500"
        className="keymap"
        xmlns="http://www.w3.org/2000/svg"
      >
        {keyPositions.map((key) => {
          const keyAction = keymap?.layers[currentLayer]?.[key.id]?.replace('&kp ', '') || key.label;
          const isPressed = pressedKeys.includes(keyAction.toLowerCase());

          return (
            <g
              key={key.id}
              transform={`translate(${key.x}, ${key.y}) ${key.rotate ? `rotate(${key.rotate})` : ''}`}
            >
              <rect
                width={key.width || 52}
                height={key.height || 52}
                rx="6"
                ry="6"
                className="key"
                fill={isPressed ? '#4ade80' : '#f6f8fa'}
                stroke={isPressed ? '#16a34a' : '#c9cccf'}
              />
              <text
                x={(key.width || 52) / 2}
                y={(key.height || 52) / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="14px"
                fill={isPressed ? 'white' : '#24292e'}
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