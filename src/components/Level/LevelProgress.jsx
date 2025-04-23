export default function LevelProgress({ currentLevel, levels, showLevelList = false }) {
  const currentIndex = levels.findIndex((level) => level.id === currentLevel.id) + 1;
  const progressPercentage = Math.round((currentIndex / levels.length) * 100);

  return (
    <div className="level-progress">

      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="progress-header">
        <span>{currentLevel.name}</span>
        <span>{progressPercentage}%</span>
      </div>
      {showLevelList && (
        <div className="level-list">
          {levels.map((level, index) => (
            <span
              key={level.id}
              className={`level-item ${index + 1 === currentIndex ? 'current' : ''} ${index + 1 < currentIndex ? 'completed' : ''
                }`}
            >
              {level.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}