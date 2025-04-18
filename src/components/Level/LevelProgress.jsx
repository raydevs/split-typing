export default function LevelProgress({ currentLevel, totalLevels, group }) {
  const groupProgress = {
    'home': Math.min(currentLevel, 15),
    'top': Math.max(0, Math.min(currentLevel - 15, 15)),
    'bottom': Math.max(0, currentLevel - 30)
  };

  return (
    <div className="level-progress">
      <h3>Progreso</h3>
      <div className="progress-group">
        <span>Home Row: {groupProgress.home}/15</span>
        <progress value={groupProgress.home} max="15"></progress>
      </div>
      <div className="progress-group">
        <span>Top Row: {groupProgress.top}/15</span>
        <progress value={groupProgress.top} max="15"></progress>
      </div>
      <div className="progress-group">
        <span>Bottom/Thumb: {groupProgress.bottom}/15</span>
        <progress value={groupProgress.bottom} max="15"></progress>
      </div>
    </div>
  );
}