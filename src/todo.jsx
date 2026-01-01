import { useEffect, useState } from "react";


export function ToDo() {
  let [tasks, setTasks] = useState({ task: "", priority: "", status: "pending" });
  let [allTasks, setAllTasks] = useState(() => {
    try {
      let data = localStorage.getItem("tasksData");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      return [];
    }
  });

  function handleChange(e) {
    let { name, value } = e.target;
    setTasks({ ...tasks, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (tasks.task === "" || tasks.priority === "") {
      alert("please fill all fields");
      return;
    }

    setAllTasks((prev) => [...prev, { ...tasks, id: Date.now() }]);
    setTasks({ task: "", priority: "", status: "pending" });
  }

  function handleStatus(id) {
    let updated = allTasks.map((item) =>
      item.id === id
        ? { ...item, status: item.status === "pending" ? "completed" : "pending" }
        : item
    );
    setAllTasks(updated);
  }

  function handleDelete(id) {
    setAllTasks(allTasks.filter((t) => t.id !== id));
  }

  function handleClear() {
    setAllTasks([]);
  }

  useEffect(() => {
    localStorage.setItem("tasksData", JSON.stringify(allTasks));
  }, [allTasks]);

  return (
    <div className="dark-body d-flex justify-content-center align-items-start pt-5">
      <div className="container" style={{ maxWidth: "650px" }}>
        
        <div className="card shadow-lg dark-card p-4 mb-4">
          <h2 className="text-center text-light mb-4 fw-bold">📝 To-Do Manager</h2>

          <form onSubmit={handleSubmit}>
            <label className="form-label text-light fw-semibold">Task</label>
            <input
              type="text"
              name="task"
              value={tasks.task}
              className="form-control dark-input mb-3"
              onChange={handleChange}
            />

            <label className="form-label text-light fw-semibold">Priority</label>
            <select
              name="priority"
              value={tasks.priority}
              className="form-select dark-input mb-4"
              onChange={handleChange}
            >
              <option value="">-- Select Priority --</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <button className="btn btn-primary w-100 fw-semibold">Add Task</button>
          </form>
        </div>

        <div className="card shadow-lg dark-card p-4">
          <h3 className="text-light mb-3 fw-bold">📌 All Tasks</h3>

          {allTasks.map((item) => (
            <div
              key={item.id}
              className="dark-task-item p-3 rounded d-flex justify-content-between align-items-center mb-3"
            >
              <div>
                <h5 className="text-light m-0 fw-semibold">{item.task}</h5>
                <span className="badge bg-info mt-1">{item.priority}</span>
              </div>

              <div className="d-flex gap-2">
                <button
                  onClick={() => handleStatus(item.id)}
                  className={`btn btn-sm ${
                    item.status === "completed" ? "btn-success" : "btn-warning"
                  }`}
                >
                  {item.status}
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <button className="btn btn-outline-danger w-100 mt-3 fw-semibold" onClick={handleClear}>
            Clear All
          </button>
        </div>

      </div>
    </div>
  );
}
