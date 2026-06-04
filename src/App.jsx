
// App component - root component managing all task stateimport { useState } from 'react'
import Header from './components/Header'
import ToDoList from './components/ToDoList'
import styles from './styles/App.module.css'

const initialTasks = [
  { id: 1, text: 'Read chapter 3 of the textbook', completed: false },
  { id: 2, text: 'Submit assignment before deadline', completed: true },
  { id: 3, text: 'Review lecture notes from Monday', completed: false },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('all')

  const addTask = (text) => {
    if (!text.trim()) return
    const newTask = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    }
    setTasks((prev) => [newTask, ...prev])
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const editTask = (id, newText) => {
    if (!newText.trim()) return
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: newText.trim() } : task
      )
    )
  }

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const completedCount = tasks.filter((t) => t.completed).length
  const activeCount = tasks.length - completedCount

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header
          onAddTask={addTask}
          activeCount={activeCount}
          totalCount={tasks.length}
        />
        <div className={styles.filterBar}>
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'all' && <span className={styles.badge}>{tasks.length}</span>}
              {f === 'active' && <span className={styles.badge}>{activeCount}</span>}
              {f === 'completed' && <span className={styles.badge}>{completedCount}</span>}
            </button>
          ))}
          {completedCount > 0 && (
            <button className={styles.clearBtn} onClick={clearCompleted}>
              Clear done
            </button>
          )}
        </div>
        <ToDoList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onToggle={toggleTask}
          onEdit={editTask}
          filter={filter}
        />
      </div>
    </div>
  )
}

export default App
