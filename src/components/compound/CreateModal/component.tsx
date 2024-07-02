import React, { FormEvent, useState } from "react";
import ContentSelector from "../ContentSelector/component";
import { Mode } from "./types";
import ContentCreator from "../ContentCreator/component";

const CreateModal = () => {
  const [mode, setMode] = useState<Mode>({
    selected: false,
    choice: "none",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    setMode({
      selected: false,
      choice: "none",
    });
    (document.getElementById("create_modal") as HTMLDialogElement)?.close();
  };

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
          {mode.selected ? (
            <ContentCreator mode={mode} />
          ) : (
            <ContentSelector setMode={setMode} />
          )}
          <div className="modal-action">
            <form method="dialog" onSubmit={handleSubmit}>
              <button type="submit" className="btn btn-wide btn-secondary">
                POST
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CreateModal;
