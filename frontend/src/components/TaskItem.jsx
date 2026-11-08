function TaskItem({ task, onToggle, onEdit, onDelete }) {
  function formatDueDate(dateValue) {
    if (!dateValue) {
      return null;
    }

    return new Date(`${dateValue}T00:00:00`).toLocaleDateString();
  }

  return (
    <article className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-main">
        <input
          aria-label={`Mark ${task.title} as ${
            task.completed ? "incomplete" : "complete"
          }`}
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
        />

        <div>
          <h3>{task.title}</h3>

          {task.description && <p>{task.description}</p>}

          {task.due_date && (
            <p className="due-date">Due: {formatDueDate(task.due_date)}</p>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button className="edit-button" type="button" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button
          className="delete-button"
          type="button"
          onClick={() => onDelete(task)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskItem;