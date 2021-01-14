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
    <>
      {!modalAPI.open && (
        <IconButton
          bg="primary"
          sx={{
            color: "background",
            boxShadow: "3px 3px 9px -4px rgba(0, 0, 0, 3.125)",
          }}
          onClick={modalAPI.toggleModal}
        >
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      )}
      <Modal rootSelector="#modal-root" modalAPI={modalAPI}>
        <EventDetailForm
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          submitLabel={"Create"}
          event={{ name: null, type: null, timestamp: new Date() }}
        />
      </Modal>
    </>
  );
};
