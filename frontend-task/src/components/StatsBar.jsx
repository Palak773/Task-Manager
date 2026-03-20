import React from 'react';

const CARDS = [
  { key: 'total',      label: 'Total',       accent: 'var(--border3)' },
  { key: 'open',       label: 'Open',        accent: 'var(--open-text)' },
  { key: 'inProgress', label: 'In Progress', accent: 'var(--prog-text)' },
  { key: 'done',       label: 'Done',        accent: 'var(--done-text)' },
];

export default function StatsBar({ stats }) {
  return (
    <div style={styles.wrap}>
      <div style={styles.grid}>
        {CARDS.map(c => (
          <div key={c.key} style={styles.card}>
            <div style={styles.label}>{c.label}</div>
            <div style={styles.value}>{stats[c.key]}</div>
            <div style={{ ...styles.bar, background: c.accent }} />
          </div>
        ))}
      </div>

      <div style={styles.progressWrap}>
        <div style={styles.progressHeader}>
          <span style={styles.progressLabel}>Overall completion</span>
          <span style={styles.progressPct}>{stats.pct}%</span>
        </div>
        <div style={styles.track}>
          <div style={{
            ...styles.fill,
            width: `${stats.pct}%`,
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrap: { marginBottom: '2rem' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 12,
    marginBottom: '1.25rem',
  },
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '1.1rem 1.25rem',
    position: 'relative',
    overflow: 'hidden',
  },
  label: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--text2)',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: 6,
  },
  value: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.2rem',
    fontWeight: 700,
    color: 'var(--text)',
    lineHeight: 1,
  },
  bar: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: 2,
    opacity: 0.6,
  },
  progressWrap: {},
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  progressLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--text3)',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
  },
  progressPct: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--accent)',
    fontWeight: 500,
  },
  track: {
    height: 4,
    background: 'var(--surface2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    background: 'linear-gradient(90deg, var(--done-text), var(--accent))',
    borderRadius: 2,
  },
};