import ToDoItem from './ToDoItem'
import styles from '../styles/ToDoList.module.css'

function ToDoList({ tasks, onDelete, onToggle, onEdit, filter }) {
  if (tasks.length === 0) {
    const emptyMessages = {
      all: { icon: '◎', text: 'No tasks yet. Add one above!' },
      active: { icon: '✓', text: 'Nothing left to do. Nice!' },
      completed: { icon: '○', text: 'Nothing completed yet.' },
    }
    const msg = emptyMessages[filter] || emptyMessages.all

    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>{msg.icon}</span>
        <p className={styles.emptyText}>{msg.text}</p>
      </div>
    )
  }

  return (
    <ul className={styles.list} role="list">
      {tasks.map((task) => (
        <ToDoItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}

export default ToDoList
