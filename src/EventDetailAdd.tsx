import React from "react";

import { Modal, useModal } from "./lib/";
import { EventDetailForm, EventDetailFormProps } from "./EventDetailForm";
import { EventsContext } from "./EventsProvider";
import { IconButton } from "theme-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const EventDetailAdd: React.FC = () => {
  const modalAPI = useModal(false);
  const eventsAPI = React.useContext(EventsContext);
  const handleSubmit: EventDetailFormProps["onSubmit"] = (e, event) => {
    e.preventDefault();
    eventsAPI.create(event);
    modalAPI.toggleModal();
  };
  const handleCancel = () => modalAPI.toggleModal();
  return (
    <div>
      {!modalAPI.open && (
        <IconButton onClick={modalAPI.toggleModal}>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      )}
      <Modal rootSelector="#modal-root" modalAPI={modalAPI}>
        <EventDetailForm onCancel={handleCancel} onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
};
