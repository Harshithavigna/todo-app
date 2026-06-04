import { useState, useRef, useEffect } from 'react'
import styles from '../styles/ToDoItem.module.css'

function ToDoItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(task.text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleEditStart = () => {
    setEditValue(task.text)
    setIsEditing(true)
  }

  const handleEditSave = () => {
    if (editValue.trim() && editValue.trim() !== task.text) {
      onEdit(task.id, editValue)
    } else {
      setEditValue(task.text)
    }
    setIsEditing(false)
  }

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') handleEditSave()
    if (e.key === 'Escape') {
      setEditValue(task.text)
      setIsEditing(false)
    }
  }

  return (
    <li className={`${styles.item} ${task.completed ? styles.completed : ''}`}>
      <button
        className={`${styles.checkbox} ${task.completed ? styles.checked : ''}`}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed && (
          <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
            <path d="M1 4L4 7L10 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className={styles.content}>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className={styles.editInput}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={handleEditKeyDown}
          />
        ) : (
          <span
            className={styles.text}
            onDoubleClick={!task.completed ? handleEditStart : undefined}
            title={!task.completed ? 'Double-click to edit' : ''}
          >
            {task.text}
          </span>
        )}
      </div>

      <div className={styles.actions}>
        {!task.completed && !isEditing && (
          <button
            className={`${styles.actionBtn} ${styles.editBtn}`}
            onClick={handleEditStart}
            aria-label="Edit task"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        )}
        {isEditing && (
          <button
            className={`${styles.actionBtn} ${styles.saveBtn}`}
            onClick={handleEditSave}
            aria-label="Save edit"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </button>
        )}
        <button
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </li>
  )
}

export default ToDoItem
