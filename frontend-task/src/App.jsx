import React, { useState } from 'react';
import { TaskProvider, useTasks } from './context/TaskContext';
import { useTaskFilter } from './hooks/useTaskFilter';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import AddTaskForm from './components/AddTaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import EditModal from './components/EditModal';
import Toast from './components/Toast';
import './styles/global.css';

function AppInner() {
  const { tasks, toast } = useTasks();
  const { filter, setFilter, search, setSearch, filtered, stats } = useTaskFilter(tasks);
  const [editTask, setEditTask] = useState(null);

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.93); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        select option { background: #1a1a24; }
        input::placeholder, textarea::placeholder { color: var(--text3); }
        input[type="text"]:focus,
        textarea:focus,
        select:focus {
          border-color: var(--accent-dark) !important;
          background: var(--surface3) !important;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--surface); }
        ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }
      `}</style>

      <div style={styles.container}>
        <Header />
        <StatsBar stats={stats} />
        <AddTaskForm />
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />
        <TaskList tasks={filtered} onEdit={setEditTask} />
      </div>

      {editTask && (
        <EditModal task={editTask} onClose={() => setEditTask(null)} />
      )}

      <Toast toast={toast} />
    </>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <AppInner />
    </TaskProvider>
  );
}

const styles = {
  container: {
    maxWidth: 860,
    margin: '0 auto',
    padding: '2.5rem 1.5rem 4rem',
    position: 'relative',
    zIndex: 1,
  },
};