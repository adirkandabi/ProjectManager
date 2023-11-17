import { useState, useRef } from "react";
import ProjectDetails from "./ProjectDetail";

export default function AddProject({
  onChangeInput,
  onSave,
  formData,
  cancelClick,
}) {
  const [isValid, setIsValid] = useState(true);
  const title = useRef();
  const description = useRef();
  const date = useRef();
  function handleSave(e) {
    e.preventDefault();
    if (
      title.current.value &&
      description.current.value &&
      date.current.value
    ) {
      setIsValid(true);
      onSave();
    } else {
      setIsValid(false);
    }
  }
  return (
    <div className={isValid ? "form-container" : "form-container-invalid"}>
      <h2>Create New Project</h2>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            ref={title}
            defaultValue={formData.title}
            onChange={onChangeInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            ref={description}
            name="description"
            defaultValue={formData.description}
            onChange={onChangeInput}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            ref={date}
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={onChangeInput}
          />
        </div>

        <div className="form-buttons">
          <button className="cancel-button" onClick={cancelClick}>
            Cancel
          </button>
          {isValid ? undefined : (
            <p className="error-message">All Fields Are Mandatory</p>
          )}
          <button type="submit" onClick={handleSave} className="save-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
