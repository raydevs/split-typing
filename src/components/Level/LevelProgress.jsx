export default function LevelProgress({ currentLevel, levels }) {
  const groupLevels = levels.filter((level) => level.group === currentLevel.group);
  const currentIndex = groupLevels.findIndex((level) => level.id === currentLevel.id) + 1;

  return (
    <div className="level-progress">
      <h3>Progreso del Grupo: {currentLevel.group}</h3>
      <div className="progress-group">
        <span>{currentIndex}/{groupLevels.length}</span>
        <progress value={currentIndex} max={groupLevels.length}></progress>
      </div>
    </div>
  );
}