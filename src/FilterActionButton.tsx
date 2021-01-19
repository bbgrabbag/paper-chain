import React from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "theme-ui";
import { Modal, useModal } from "./lib";
import { FilterForm } from "./FilterForm";
import { FilterByCategory, FilterByOccurence, FilterEntity } from "./entities";
import { EventsContext } from "./EventsProvider";
import {
  CategoryFilterRule,
  FilterRuleName,
  OccurrenceFilterRule,
} from "./config";

export const FilterActionButton: React.FC = () => {
  const modalAPI = useModal();
  const eventsAPI = React.useContext(EventsContext);

  const handleSubmit = (e: React.FormEvent, filters: FilterEntity) => {
    e.preventDefault();

    const categoryFilter: CategoryFilterRule = {
      name: FilterRuleName.Category,
      category: filters.byCategory || FilterByCategory.All,
    };

    const occurrenceFilter: OccurrenceFilterRule = {
      name: FilterRuleName.Occurrence,
      date: filters.filterDate,
      occurrence: filters.byOccurrence || FilterByOccurence.Whenever,
    };

    eventsAPI.addFilters([categoryFilter, occurrenceFilter]);

    modalAPI.toggleModal();
  };

  return (
    <>
      <IconButton
        onClick={modalAPI.toggleModal}
        disabled={!eventsAPI.meta.count}
      >
        <FontAwesomeIcon icon={faFilter} />
      </IconButton>
      <Modal rootSelector="#modal-root" modalAPI={modalAPI}>
        <FilterForm onSubmit={handleSubmit} onCancel={modalAPI.toggleModal} />
      </Modal>
    </>
  );
};
