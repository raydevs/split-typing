import { achievements } from '../../data/achievements';

export default function Achievements({ unlocked }) {
  return (
    <div className="achievements-container">
      <h3>Logros Desbloqueados</h3>
      <div className="achievements-grid">
        {achievements.map(ach => (
          <div
            key={ach.id}
            className={`achievement ${unlocked.includes(ach.id) ? 'unlocked' : 'locked'}`}
          >
            <div className="achievement-icon">
              {unlocked.includes(ach.id) ? ach.icon : '🔒'}
            </div>
            <div className="achievement-info">
              <h4>{ach.name}</h4>
              <p>{ach.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}