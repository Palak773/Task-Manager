import React from 'react';

const FILTERS = [
  { value: 'all',         label: 'All' },
  { value: 'open',        label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done',        label: 'Done' },
];

export default function FilterBar({ filter, setFilter, search, setSearch }) {
  return (
    <div style={styles.wrap}>
      <div style={styles.filters}>
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            style={{
              ...styles.btn,
              ...(filter === f.value ? styles.btnActive : {}),
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={styles.searchWrap}>
        <span style={styles.searchIcon}>⌕</span>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tasks…"
          style={styles.searchInput}
        />
        {search && (
          <button onClick={() => setSearch('')} style={styles.clearBtn}>✕</button>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: '1.25rem',
    flexWrap: 'wrap',
  },
  filters: { display: 'flex', gap: 6 },
  btn: {
    padding: '6px 16px',
    fontSize: 12,
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
    letterSpacing: '0.04em',
    border: '1px solid var(--border)',
    borderRadius: 20,
    background: 'transparent',
    color: 'var(--text2)',
    cursor: 'pointer',
    transition: 'all var(--transition)',
  },
  btnActive: {
    background: 'var(--accent)',
    color: '#0a0a0f',
    borderColor: 'var(--accent)',
    fontWeight: 700,
  },
  searchWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 11,
    color: 'var(--text3)',
    fontSize: 14,
    pointerEvents: 'none',
    zIndex: 1,
  },
  searchInput: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 20,
    color: 'var(--text)',
    fontFamily: 'var(--font-body)',
    fontSize: 13,
    padding: '7px 32px 7px 32px',
    outline: 'none',
    width: 210,
    transition: 'border-color var(--transition)',
  },
  clearBtn: {
    position: 'absolute',
    right: 10,
    background: 'none',
    border: 'none',
    color: 'var(--text3)',
    fontSize: 11,
    cursor: 'pointer',
    padding: 2,
  },
};