export const Keyboard = ({ targetKeys = [], lastErrorKey }) => {
  const leftHandKeys = ["a", "r", "s", "t"]; // Ejemplo Colemak-DH
  const rightHandKeys = ["n", "e", "i", "o"];

  return (
    <div className="flex gap-4 justify-center my-6">
      {/* Mano izquierda */}
      <div className="flex flex-col gap-1">
        {leftHandKeys.map((key) => (
          <div
            key={key}
            className={`
              w-10 h-10 flex items-center justify-center rounded
              font-bold
              ${targetKeys.includes(key) ? "bg-green-500 text-white" : "bg-gray-200"}
              ${lastErrorKey === key ? "bg-red-500 animate-pulse" : ""}
            `}
          >
            {key}
          </div>
        ))}
      </div>

      {/* Mano derecha */}
      <div className="flex flex-col gap-1">
        {rightHandKeys.map((key) => (
          <div
            key={key}
            className={`
              w-10 h-10 flex items-center justify-center rounded
              font-bold
              ${targetKeys.includes(key) ? "bg-green-500 text-white" : "bg-gray-200"}
              ${lastErrorKey === key ? "bg-red-500 animate-pulse" : ""}
            `}
          >
            {key}
          </div>
        ))}
      </div>
    </div>
  );
};