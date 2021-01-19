import React from "react";
import { faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "theme-ui";
import { Modal, useModal } from "./lib";
import { EventsContext } from "./EventsProvider";
import { SortForm } from "./SortForm";
import { SortRule } from "./config";

export const SortActionButton: React.FC = () => {
  const modalAPI = useModal();
  const eventsAPI = React.useContext(EventsContext);

  const handleSubmit = (e: React.FormEvent, sortRule: SortRule) => {
    e.preventDefault();
    eventsAPI.setSortRule(sortRule);
    modalAPI.toggleModal();
  };

  return (
    <>
      <IconButton onClick={modalAPI.toggleModal} disabled={!eventsAPI.meta.count}>
        <FontAwesomeIcon icon={faSortAlphaUp} />
      </IconButton>
      <Modal rootSelector="#modal-root" modalAPI={modalAPI}>
        <SortForm onSubmit={handleSubmit} onCancel={modalAPI.toggleModal} />
      </Modal>
    </>
  );
};
