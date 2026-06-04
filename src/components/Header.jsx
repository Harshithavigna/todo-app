import { useState } from 'react'
import styles from '../styles/Header.module.css'

function Header({ onAddTask, activeCount, totalCount }) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onAddTask(inputValue)
      setInputValue('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit(e)
  }

  const progress = totalCount > 0 ? ((totalCount - activeCount) / totalCount) * 100 : 0

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <div className={styles.titleBlock}>
          <span className={styles.icon}>✦</span>
          <h1 className={styles.title}>My Tasks</h1>
        </div>
        <div className={styles.statsBox}>
          <span className={styles.statNum}>{activeCount}</span>
          <span className={styles.statLabel}>remaining</span>
        </div>
      </div>

      {totalCount > 0 && (
        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.progressText}>
            {Math.round(progress)}% done
          </span>
        </div>
      )}

      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <button
          type="submit"
          className={styles.addBtn}
          disabled={!inputValue.trim()}
        >
          Add
        </button>
      </form>
    </header>
  )
}

export default Header
