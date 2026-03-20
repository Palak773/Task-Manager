import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';

export default function EditModal({ task, onClose }) {
  const { updateTask } = useTasks();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('open');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDesc(task.description || '');
      setStatus(task.status || 'open');
      setError('');
    }
  }, [task]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && !saving) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, saving]);

  if (!task) return null;

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    setError('');

    try {
      setSaving(true);
      await updateTask(task.id, {
        title: title.trim(),
        description: desc.trim(),
        status,
      });
      onClose();
    } catch (err) {
      setError('Failed to update task.');
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'var(--surface3)',
    border: '1px solid var(--border2)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text)',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    padding: '10px 13px',
    outline: 'none',
  };

  return (
    <div
      style={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && !saving && onClose()}
    >
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <div>
            <h2 style={styles.modalTitle}>Edit Task</h2>
            <span style={styles.modalSub}>
              PATCH /tasks/{String(task.id).slice(0, 8)}
            </span>
          </div>
          <button
            onClick={onClose}
            style={styles.closeBtn}
            disabled={saving}
          >
            ✕
          </button>
        </div>

        <div style={styles.fields}>
          <div style={styles.field}>
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
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              style={inputStyle}
              autoFocus
            />
            {error && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--danger)',
                }}
              >
                {error}
              </span>
            )}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              style={{ ...inputStyle, resize: 'none' }}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={inputStyle}
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <div style={styles.modalActions}>
          <button
            onClick={onClose}
            style={styles.btnGhost}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              ...styles.btnPrimary,
              opacity: saving ? 0.7 : 1,
              cursor: saving ? 'not-allowed' : 'pointer',
            }}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.75)',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    animation: 'fadeIn 0.15s ease',
  },
  modal: {
    background: 'var(--surface)',
    border: '1px solid var(--border2)',
    borderRadius: 'var(--radius)',
    padding: '1.75rem',
    width: '100%',
    maxWidth: 480,
    margin: '0 1rem',
    boxShadow: 'var(--shadow)',
    animation: 'modalIn 0.2s cubic-bezier(0.34,1.56,0.64,1)',
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
  },
  modalTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--text)',
    marginBottom: 2,
  },
  modalSub: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--accent)',
    opacity: 0.7,
  },
  closeBtn: {
    width: 30,
    height: 30,
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-xs)',
    color: 'var(--text2)',
    cursor: 'pointer',
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: 13,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  label: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--text3)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: '1.5rem',
  },
  btnGhost: {
    padding: '9px 20px',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    background: 'transparent',
    color: 'var(--text2)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
  },
  btnPrimary: {
    padding: '9px 22px',
    fontFamily: 'var(--font-display)',
    fontSize: 14,
    fontWeight: 600,
    background: 'var(--accent)',
    color: '#0a0a0f',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    letterSpacing: '0.02em',
  },
};