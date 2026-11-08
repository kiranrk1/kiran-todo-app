import TaskItem from "./TaskItem";

function TaskList({ tasks, loading, onToggle, onEdit, onDelete }) {
  if (loading) {
    return <p className="status-message">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return (
      <p className="status-message">
        No tasks yet. Add your first task using the form.
      </p>
    );
  }

  return (
    <section className="task-list" aria-label="Task list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

export default TaskList;