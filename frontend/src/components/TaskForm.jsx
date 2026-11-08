import { useEffect, useState } from "react";

const emptyTask = {
  title: "",
  description: "",
  completed: false,
  due_date: "",
};

function TaskForm({ editingTask, onSave, onCancel, saving }) {
  const [formData, setFormData] = useState(emptyTask);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description || "",
        completed: editingTask.completed,
        due_date: editingTask.due_date || "",
      });
    } else {
      setFormData(emptyTask);
    }

    setFormError("");
  }, [editingTask]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim()) {
      setFormError("Please enter a task title.");
      return;
    }

    setFormError("");

    await onSave({
      ...formData,
      title: formData.title.trim(),
      due_date: formData.due_date || null,
    });
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? "Edit task" : "Add a task"}</h2>

      {formError && <p className="error-message">{formError}</p>}

      <label htmlFor="title">Task title *</label>
      <input
        id="title"
        name="title"
        type="text"
        value={formData.title}
        onChange={handleChange}
        placeholder="For example: Finish React lesson"
        maxLength="200"
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Optional details"
        rows="4"
      />

      <label htmlFor="due_date">Due date</label>
      <input
        id="due_date"
        name="due_date"
        type="date"
        value={formData.due_date}
        onChange={handleChange}
      />

      <label className="checkbox-label" htmlFor="completed">
        <input
          id="completed"
          name="completed"
          type="checkbox"
          checked={formData.completed}
          onChange={handleChange}
        />
        Mark as completed
      </label>

      <div className="form-actions">
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : editingTask ? "Save changes" : "Add task"}
        </button>

        {editingTask && (
          <button
            className="secondary-button"
            type="button"
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;