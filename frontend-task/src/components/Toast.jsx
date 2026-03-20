import React from 'react';

export default function Toast({ toast }) {
  if (!toast) return null;

  const accentColor =
    toast.type === 'danger' ? 'var(--danger)' :
    toast.type === 'info'   ? 'var(--open-text)' :
    'var(--accent)';

  return (
    <div style={{ ...styles.toast, borderLeftColor: accentColor }}>
      <span style={{ ...styles.method, color: accentColor }}>{toast.method}</span>
      <span style={styles.message}>{toast.message}</span>
    </div>
  );
}

const styles = {
  toast: {
    position: 'fixed',
    bottom: 24,
    right: 24,
    background: 'var(--surface2)',
    border: '1px solid var(--border2)',
    borderLeft: '3px solid',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 18px',
    zIndex: 200,
    maxWidth: 320,
    boxShadow: 'var(--shadow)',
    animation: 'toastIn 0.25s cubic-bezier(0.34,1.56,0.64,1)',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  method: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '0.1em',
  },
  message: {
    fontFamily: 'var(--font-body)',
    fontSize: 13,
    color: 'var(--text)',
  },
};