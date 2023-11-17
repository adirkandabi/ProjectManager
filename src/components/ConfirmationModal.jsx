import { createPortal } from "react-dom";

export default function ConfirmationModal({ onCancel, onConfirm }) {
  return createPortal(
    <div className="confirmation-modal">
      <p>Are you sure you want to delete this project?</p>
      <button className="confirm" onClick={onConfirm}>
        Confirm
      </button>
      <button className="cancel" onClick={onCancel}>
        Cancel
      </button>
    </div>,
    document.querySelector("body")
  );
}
