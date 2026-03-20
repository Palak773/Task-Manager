import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

export default function AddTaskForm() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('open');
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(null);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    setError('');

    try {
      await addTask({
        title: title.trim(),
        description: desc.trim(),
        status,
      });

      setTitle('');
      setDesc('');
      setStatus('open');
    } catch (err) {
      setError('Failed to add task.');
    }
  };

  const inputStyle = (field) => ({
    ...styles.input,
    borderColor:
      focused === field
        ? 'var(--accent-dark)'
        : error && field === 'title'
        ? 'var(--danger)'
        : 'var(--border)',
    background: focused === field ? 'var(--surface3)' : 'var(--surface2)',
  });

  return (
    <div style={styles.wrap}>
      <div style={styles.sectionTitle}>
        <span style={styles.sectionLabel}>New Task</span>
        <span style={styles.endpoint}>POST /tasks</span>
        <div style={styles.divider} />
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div style={styles.fieldFull}>
          <label style={styles.label}>
            Title <span style={{ color: 'var(--danger)' }}>*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            onFocus={() => setFocused('title')}
            onBlur={() => setFocused(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit(e);
            }}
            placeholder="What needs to be done?"
            maxLength={120}
            style={inputStyle('title')}
          />
          {error && <span style={styles.error}>{error}</span>}
        </div>

        <div style={styles.row}>
          <div style={{ ...styles.field, flex: 2 }}>
            <label style={styles.label}>Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              onFocus={() => setFocused('desc')}
              onBlur={() => setFocused(null)}
              placeholder="Optional details…"
              rows={2}
              style={{ ...inputStyle('desc'), resize: 'none' }}
            />
          </div>

          <div style={{ ...styles.field, flex: 1 }}>
            <label style={styles.label}>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              onFocus={() => setFocused('status')}
              onBlur={() => setFocused(null)}
              style={inputStyle('status')}
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <div style={styles.actions}>
          <button type="submit" style={styles.btnPrimary}>
            <span>＋</span> Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  wrap: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '1.5rem',
    marginBottom: '1.75rem',
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: '1.25rem',
  },
  sectionLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--text2)',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    whiteSpace: 'nowrap',
  },
  endpoint: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--accent)',
    opacity: 0.7,
    whiteSpace: 'nowrap',
  },
  divider: {
    flex: 1,
    height: 1,
    background: 'var(--border)',
  },
  fieldFull: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    marginBottom: 10,
  },
  row: {
    display: 'flex',
    gap: 10,
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    minWidth: 0,
  },
  label: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--text3)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  input: {
    width: '100%',
    background: 'var(--surface2)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text)',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    padding: '10px 13px',
    outline: 'none',
    transition: 'border-color var(--transition), background var(--transition)',
  },
  error: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--danger)',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    padding: '10px 24px',
    fontFamily: 'var(--font-display)',
    fontSize: 14,
    fontWeight: 600,
    background: 'var(--accent)',
    color: '#0a0a0f',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    letterSpacing: '0.02em',
  },
};