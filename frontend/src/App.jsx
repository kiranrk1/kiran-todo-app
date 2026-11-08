import { useEffect, useState } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import api from "./services/api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("tasks/");
      setTasks(response.data);
    } catch {
      setError(
        "Could not load tasks. Make sure the Django server is running."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function saveTask(taskData) {
    try {
      setSaving(true);
      setError("");

      if (editingTask) {
        await api.patch(`tasks/${editingTask.id}/`, taskData);
      } else {
        await api.post("tasks/", taskData);
      }

      setEditingTask(null);
      await loadTasks();
    } catch (requestError) {
      const apiError = requestError.response?.data?.title?.[0];

      setError(apiError || "Could not save the task. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleTask(task) {
    try {
      setError("");

      await api.patch(`tasks/${task.id}/`, {
        completed: !task.completed,
      });

      await loadTasks();
    } catch {
      setError("Could not update the completion status.");
    }
  }

  async function deleteTask(task) {
    const confirmed = window.confirm(`Delete "${task.title}"?`);

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await api.delete(`tasks/${task.id}/`);

      if (editingTask?.id === task.id) {
        setEditingTask(null);
      }

      await loadTasks();
    } catch {
      setError("Could not delete the task.");
    }
  }

  return (
    <main className="app-container">
      <header>
        <p className="eyebrow">Kiran's productivity space</p>
        <h1>To-Do List</h1>
        <p className="subtitle">Plan tasks, track progress, and get things done.</p>
      </header>

      {error && <p className="error-message page-error">{error}</p>}

      <div className="app-grid">
        <TaskForm
          editingTask={editingTask}
          onSave={saveTask}
          onCancel={() => setEditingTask(null)}
          saving={saving}
        />

        <section>
          <div className="task-list-header">
            <h2>Your tasks</h2>
            <button className="refresh-button" type="button" onClick={loadTasks}>
              Refresh
            </button>
          </div>

          <TaskList
            tasks={tasks}
            loading={loading}
            onToggle={toggleTask}
            onEdit={setEditingTask}
            onDelete={deleteTask}
          />
        </section>
      </div>
    </main>
  );
}

export default App;