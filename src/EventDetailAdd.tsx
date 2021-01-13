import React from "react";

import { Modal, useModal } from "./lib/";
import { EventDetailForm, EventDetailFormProps } from "./EventDetailForm";
import { EventsContext } from "./EventsProvider";

export const EventDetailAdd: React.FC = () => {
  const modalAPI = useModal(false);
  const eventsAPI = React.useContext(EventsContext);
  const handleSubmit: EventDetailFormProps['onSubmit'] = (e, event) => {
    e.preventDefault();
    eventsAPI.create(event);
    modalAPI.toggleModal();
  }
  const handleCancel = () => modalAPI.toggleModal();
  return (
    <div>
      <button onClick={modalAPI.toggleModal}>+</button>
      <Modal rootSelector="#modal-root" modalAPI={modalAPI}>
        <EventDetailForm onCancel={handleCancel}onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
};
