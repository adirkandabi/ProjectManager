import SideBar from "./components/SideBar";
import ProjectDetails from "./components/ProjectDetail";
import AddProject from "./components/AddProject";
import { useState, useRef } from "react";

const initialFormData = {
  title: "",
  description: "",
  dueDate: "",
  tasks: [],
};
const initialProjects = [];
function getProjectsFromLocalStorage() {
  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index);
    const value = localStorage.getItem(key);

    if (value) {
      const project = JSON.parse(value);
      initialProjects.push(project);
    }
  }
}
getProjectsFromLocalStorage();
//localStorage.clear();
function formatDate(inputDateString) {
  const inputDate = new Date(inputDateString);
  const formattedDate = inputDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return formattedDate;
}

function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [newProjectClick, setNewProjectClick] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [projectClicked, setProjectClicked] = useState(null);
  function HandleChange(e) {
    const { name, value } = e.target;
    if (value.trim().length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }
  function HandleSave() {
    const newFormData = {
      title: formData.title,
      description: formData.description,
      dueDate: formatDate(formData.dueDate),
      tasks: [],
    };
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects, newFormData];
      localStorage.setItem(
        updatedProjects.length - 1,
        JSON.stringify(newFormData)
      );
      return updatedProjects;
    });

    setNewProjectClick(false);
    setFormData(initialFormData);
  }

  function HandleNewProject() {
    setNewProjectClick(true);
  }
  function HandleAddTask(task) {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects[projectClicked] = {
        ...updatedProjects[projectClicked],
        tasks: [...updatedProjects[projectClicked].tasks, task],
      };
      localStorage.setItem(
        projectClicked,
        JSON.stringify(updatedProjects[projectClicked])
      );
      return updatedProjects;
    });
  }
  function HandleDeleteTask(taskIndex) {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects[projectClicked] = {
        ...updatedProjects[projectClicked],
        tasks: updatedProjects[projectClicked].tasks.filter(
          (task, entry) => entry !== taskIndex
        ),
      };
      //  console.log(updatedProjects[projectClicked]);
      localStorage.setItem(
        projectClicked,
        JSON.stringify(updatedProjects[projectClicked])
      );
      return updatedProjects;
    });
  }
  function HandleSelectProject(key) {
    setProjectClicked(key);
  }
  function handleDeleteProject() {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.filter(
        (project, index) => index !== projectClicked
      );

      // Remove the project from local storage
      localStorage.removeItem(projectClicked);

      // Update local storage keys to match the updated array
      const updatedLocalStorage = { ...localStorage };
      for (
        let i = projectClicked + 1;
        i < updatedProjects.length + projectClicked;
        i++
      ) {
        // Shift the keys in local storage to match the updated array
        updatedLocalStorage[i - 1] = updatedLocalStorage[i];
        delete updatedLocalStorage[i];
      }
      localStorage.clear();
      Object.keys(updatedLocalStorage).forEach((key) => {
        localStorage.setItem(key, updatedLocalStorage[key]);
      });

      setProjectClicked(null);
      return updatedProjects;
    });
  }

  return (
    <>
      <header>
        <h1>Projects Manager</h1>
      </header>
      <div className="app-container">
        {newProjectClick ? (
          <AddProject
            onChangeInput={HandleChange}
            onSave={HandleSave}
            cancelClick={HandleNewProject}
            formData={formData}
          />
        ) : (
          <ProjectDetails
            onSelect={HandleNewProject}
            projectNumber={projectClicked}
            onDelete={handleDeleteProject}
            projects={projects}
            addTask={HandleAddTask}
            deleteTask={HandleDeleteTask}
          />
        )}

        <SideBar
          onSelectNew={HandleNewProject}
          onSelectProject={HandleSelectProject}
          projects={projects}
        />
      </div>
    </>
  );
}

export default App;
