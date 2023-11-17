import noProjectImg from "../assets/no-projects.png";
import ProjectTasks from "./ProjectTasks";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";

export default function ProjectDetails({
  onSelect,
  projectNumber,
  onDelete,
  projects,
  addTask,
  deleteTask,
}) {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const handleDeleteClick = () => {
    setShowConfirmationModal(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowConfirmationModal(false);
  };
  if (showConfirmationModal) {
    document.querySelector(".app").classList.add("modal-open");
  } else {
    document.querySelector(".app").classList.remove("modal-open");
  }
  if (projectNumber === null || projects.length === 0) {
    return (
      <div className="no-project">
        <img src={noProjectImg} alt="no project selected" />
        <h1>No Project Selected</h1>
        <p>Select a project or get startet with a new one</p>
        <button onClick={onSelect} className="new-project">
          Create new project
        </button>
      </div>
    );
  } else {
    return (
      <>
        <section className="project">
          <div className="project-details">
            <h1>{projects[projectNumber].title}</h1>
            <button onClick={handleDeleteClick} className="delete-project">
              Delete Project
            </button>
            <p className="date">{projects[projectNumber].dueDate}</p>
            <p className="description">{projects[projectNumber].description}</p>
          </div>
          <hr className="continuous-line"></hr>
          <ProjectTasks
            addTask={addTask}
            deleteTask={deleteTask}
            projects={projects}
            index={projectNumber}
          />
        </section>
        {showConfirmationModal && (
          <ConfirmationModal
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
          />
        )}
      </>
    );
  }
}
