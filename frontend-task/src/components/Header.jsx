import React from 'react';

export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <span style={styles.sup}>NestJS REST API</span>
        <h1 style={styles.h1}>TaskFlow</h1>
      </div>
      <div style={styles.right}>
        <span style={styles.badge}>localhost:3000</span>
        <span style={styles.dot} />
        <span style={styles.live}>Live</span>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: '2.5rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid var(--border)',
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  sup: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
  },
  h1: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.8rem',
    fontWeight: 700,
    color: 'var(--text)',
    letterSpacing: '-0.03em',
    lineHeight: 1,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    padding: '5px 13px',
    background: 'var(--surface2)',
    border: '1px solid var(--border2)',
    borderRadius: 20,
    color: 'var(--text2)',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: 'var(--accent)',
    boxShadow: '0 0 6px var(--accent)',
  },
  live: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--accent)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
};