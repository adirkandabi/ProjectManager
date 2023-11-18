import { useRef } from "react";

export default function ProjectTasks({ addTask, deleteTask, projects, index }) {
  const taskInput = useRef();

  function handelAddClick() {
    if (taskInput.current.value.trim().length > 0) {
      addTask(taskInput.current.value);
      taskInput.current.value = "";
    }
  }

  function handelDeleteTask(index) {
    deleteTask(index);
  }
  return (
    <section className="tasks">
      <h1>Tasks</h1>
      <input
        className="input-task"
        placeholder="Write yourself a task..."
        ref={taskInput}
      />
      <button className="add-task" onClick={handelAddClick}>
        Add Task
      </button>
      {projects[index].tasks.length > 0 ? (
        projects[index].tasks.map((task, index) => (
          <div className="task-group" key={index}>
            <p>{task}</p>
            <button
              className="clear-task"
              onClick={() => handelDeleteTask(index)}
            >
              Clear
            </button>
          </div>
        ))
      ) : (
        <p className="no-tasks">This project does not have any tasks yet.</p>
      )}
    </section>
  );
}
