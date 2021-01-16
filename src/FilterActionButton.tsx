import React from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "theme-ui";
import { Modal, useModal } from "./lib";
import { FilterForm } from "./FilterForm";

export const FilterActionButton: React.FC = () => {
  const modalAPI = useModal();
  return (
    <>
      <IconButton variant="iconSm" onClick={modalAPI.toggleModal}>
        <FontAwesomeIcon icon={faFilter} />
      </IconButton>
      <Modal rootSelector="#modal-root" modalAPI={modalAPI}>
        <FilterForm />
      </Modal>
    </>
  );
};
