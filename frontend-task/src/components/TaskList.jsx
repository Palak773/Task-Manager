import React from 'react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, onEdit }) {
  if (!tasks.length) {
    return (
      <div style={styles.empty}>
        <div style={styles.emptyIcon}>◻</div>
        <p style={styles.emptyText}>No tasks found.</p>
        <p style={styles.emptyHint}>Try adjusting your filter or search.</p>
      </div>
    );
  }

  return (
    <div style={styles.list}>
      {tasks.map((task, i) => (
        <div
          key={task.id}
          style={{
            animation: 'slideIn 0.22s ease both',
            animationDelay: `${i * 0.04}s`,
          }}
        >
          <TaskCard task={task} onEdit={onEdit} />
        </div>
      ))}
    </div>
  );
}

const styles = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  empty: {
    textAlign: 'center',
    padding: '3.5rem 0',
  },
  emptyIcon: {
    fontSize: '2.5rem',
    opacity: 0.15,
    marginBottom: '1rem',
  },
  emptyText: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.1rem',
    color: 'var(--text2)',
    marginBottom: 4,
  },
  emptyHint: {
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    color: 'var(--text3)',
  },
};