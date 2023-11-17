import AddProject from "./AddProject";
import { useState } from "react";

export default function SideBar({ onSelectNew, onSelectProject, projects }) {
  return (
    <section className="projects-container">
      <h1>YOUR PROJECTS</h1>
      <button onClick={onSelectNew} className="new-project">
        + Add Project
      </button>
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <p key={index}>
            <button
              onClick={() => onSelectProject(index)}
              name={index}
              className="btn-project"
            >
              {project.title}
            </button>
          </p>
        ))
      ) : (
        <p className="empty-list-message">There Are No Saved Projects Yet.</p>
      )}
    </section>
  );
}
