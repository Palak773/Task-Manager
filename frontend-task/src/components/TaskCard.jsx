import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import Badge from './Badge';

export default function TaskCard({ task, onEdit }) {
  const { toggleTask, deleteTask } = useTasks();
  const [hovered, setHovered] = useState(false);
  const [loadingAction, setLoadingAction] = useState(null);

  const isDone = task.status === 'done';

  const handleToggle = async () => {
    try {
      setLoadingAction('toggle');
      await toggleTask(task.id);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDelete = async () => {
    try {
      setLoadingAction('delete');
      await deleteTask(task.id);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div
      style={{
        ...styles.card,
        borderColor: hovered ? 'var(--border2)' : 'var(--border)',
        transform: hovered ? 'translateX(3px)' : 'translateX(0)',
        opacity: isDone ? 0.55 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={handleToggle}
        disabled={loadingAction === 'toggle'}
        style={{
          ...styles.checkbox,
          background: isDone ? 'var(--done-text)' : 'transparent',
          borderColor: isDone ? 'var(--done-text)' : 'var(--border2)',
          cursor: loadingAction === 'toggle' ? 'not-allowed' : 'pointer',
          opacity: loadingAction === 'toggle' ? 0.7 : 1,
        }}
        title={isDone ? 'Mark incomplete' : 'Mark complete'}
      >
        {isDone && (
          <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
            <path
              d="M1 3.5L3.8 6L9 1"
              stroke="#0a0a0f"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <div style={styles.body}>
        <div
          style={{
            ...styles.title,
            textDecoration: isDone ? 'line-through' : 'none',
            color: isDone ? 'var(--text3)' : 'var(--text)',
          }}
        >
          {task.title}
        </div>

        {task.description && <div style={styles.desc}>{task.description}</div>}

        <div style={styles.footer}>
          <Badge status={task.status} />
          <span style={styles.date}>
            {task.created_at
              ? new Date(task.created_at).toLocaleString()
              : 'No date'}
          </span>
          <span style={styles.endpoint}>
            GET /tasks/{String(task.id).slice(0, 8)}
          </span>
        </div>
      </div>

      <div style={styles.actions}>
        <ActionBtn
          onClick={() => onEdit(task)}
          title="Edit task"
          label="✎"
          disabled={loadingAction === 'delete' || loadingAction === 'toggle'}
        />
        <ActionBtn
          onClick={handleDelete}
          title="Delete task"
          label="✕"
          danger
          disabled={loadingAction === 'delete'}
        />
      </div>
    </div>
  );
}

function ActionBtn({ onClick, title, label, danger, disabled }) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...styles.iconBtn,
        background: hov
          ? danger
            ? 'var(--danger-bg)'
            : 'var(--surface2)'
          : 'transparent',
        borderColor: hov
          ? danger
            ? 'var(--danger-border)'
            : 'var(--border)'
          : 'transparent',
        color: hov
          ? danger
            ? 'var(--danger)'
            : 'var(--text)'
          : 'var(--text2)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {label}
    </button>
  );
}

const styles = {
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '1rem 1.25rem',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 13,
    transition:
      'border-color var(--transition), transform var(--transition), opacity var(--transition)',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: '50%',
    border: '1.5px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
    transition: 'background var(--transition), border-color var(--transition)',
  },
  body: { flex: 1, minWidth: 0 },
  title: {
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 4,
    transition: 'color var(--transition)',
  },
  desc: {
    fontSize: 13,
    color: 'var(--text2)',
    marginBottom: 10,
    lineHeight: 1.5,
    fontFamily: 'var(--font-mono)',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  date: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--text3)',
  },
  endpoint: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    color: '#3a3a4a',
    marginLeft: 'auto',
  },
  actions: { display: 'flex', gap: 4, flexShrink: 0 },
  iconBtn: {
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: '1px solid transparent',
    borderRadius: 'var(--radius-xs)',
    fontSize: 13,
    transition: 'all var(--transition)',
  },
};