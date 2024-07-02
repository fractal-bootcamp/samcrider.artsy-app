import React from "react";
import ContentSelector from "../ContentSelector/component";

const CreateModal = () => {
  return (
    <div>
      <button
        className="btn btn-secondary"
        onClick={() =>
          (
            document.getElementById("create_modal") as HTMLDialogElement
          )?.showModal()
        }
      >
        CREATE
      </button>
      <dialog id="create_modal" className="modal">
        <div className="modal-box flex flex-col justify-between items-center">
          <ContentSelector />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-wide btn-secondary">POST</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CreateModal;
