import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Box, Button, Flex, Heading, IconButton } from "theme-ui";
import { CategoryFilterRule, CustomValidatorKeys, FilterRuleName, OccurrenceFilterRule, useForm } from "./config";
import { FilterByCategory, FilterByOccurence, FilterEntity } from "./entities";
import {
  EventsContext,
} from "./EventsProvider";
import { DatePicker, DefaultFormatterKeys, Form, Radio } from "./lib";
import { RadioGroup } from "./lib/Form/RadioGroup";

export interface FilterFormProps {
  onCancel: (e: React.MouseEvent) => void;
  onSubmit: (e: React.FormEvent, filterEntity: FilterEntity) => void;
}

export const FilterForm: React.FC<FilterFormProps> = (props) => {
  const eventsApi = React.useContext(EventsContext);

  const initialCategoryFilters = eventsApi.filterRules.find(
    (r) => r.name === FilterRuleName.Category
  ) as CategoryFilterRule | null;
  const initialOccurrenceFilters = eventsApi.filterRules.find(
    (r) => r.name === FilterRuleName.Occurrence
  ) as OccurrenceFilterRule | null;

  const formControls = useForm<FilterEntity>(
    {
      byCategory: {
        type: DefaultFormatterKeys.Text,
        validators: [],
      },
      byOccurrence: {
        type: DefaultFormatterKeys.Text,
        validators: [],
      },
      filterDate: {
        type: DefaultFormatterKeys.Date,
        validators: [CustomValidatorKeys.Occurrence],
      },
    },
    {
      byCategory: initialCategoryFilters?.category || FilterByCategory.All,
      byOccurrence:
        initialOccurrenceFilters?.occurrence || FilterByOccurence.Whenever,
      filterDate: initialOccurrenceFilters?.date || new Date(),
    }
  );

  const handleSubmit = (e: React.FormEvent): void => {
    props.onSubmit(e, formControls.entity);
  };

  const handleReset = () => {
    formControls.reset({
      byCategory: FilterByCategory.All,
      byOccurrence: FilterByOccurence.Whenever,
      filterDate: new Date(),
    });
  };

  return (
    <Form
      id="filter-form"
      onSubmit={handleSubmit}
      sx={{ flexDirection: "column", width: "100%", position: "relative" }}
    >
      <Heading as="h5">Category</Heading>
      <RadioGroup
        id="filter-category-group"
        direction="column"
        sx={{ width: "100%" }}
        isPristine={formControls.fieldControls.byCategory.isPristine}
        errors={formControls.fieldControls.byCategory.errors}
      >
        <Flex sx={{ width: "100%" }}>
          <Box sx={{ flex: 1 }}>
            <Radio
              label="All"
              radioGroup="by-category"
              fieldName="byCategory"
              radioValue={FilterByCategory.All}
              formControls={formControls}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Radio
              label="Since"
              radioGroup="by-category"
              fieldName="byCategory"
              radioValue={FilterByCategory.Since}
              formControls={formControls}
            />
          </Box>
        </Flex>
        <Flex sx={{ width: "100%" }}>
          <Box sx={{ flex: 1 }}>
            <Radio
              label="Until"
              radioGroup="by-category"
              fieldName="byCategory"
              radioValue={FilterByCategory.Until}
              formControls={formControls}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Radio
              label="Elapsed"
              radioGroup="by-category"
              fieldName="byCategory"
              radioValue={FilterByCategory.Elapsed}
              formControls={formControls}
            />
          </Box>
        </Flex>
      </RadioGroup>

      <Heading as="h5">Occurring</Heading>

      <RadioGroup
        sx={{ width: "100%" }}
        errors={formControls.fieldControls.byOccurrence.errors}
        isPristine={formControls.fieldControls.byOccurrence.isPristine}
        direction="column"
      >
        <Radio
          label="Whenever"
          radioGroup="by-occurrence"
          fieldName="byOccurrence"
          radioValue={FilterByOccurence.Whenever}
          formControls={formControls}
        />
        <Flex sx={{ width: "100%" }}>
          <Box sx={{ flex: 1 }}>
            <Radio
              label="Before"
              radioGroup="by-occurrence"
              fieldName="byOccurrence"
              radioValue={FilterByOccurence.Before}
              formControls={formControls}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Radio
              label="After"
              radioGroup="by-occurrence"
              fieldName="byOccurrence"
              radioValue={FilterByOccurence.After}
              formControls={formControls}
            />
          </Box>
        </Flex>

        {formControls.fieldControls.byOccurrence.rawValue !==
          FilterByOccurence.Whenever && (
          <DatePicker
            label=""
            fieldName="filterDate"
            formControls={formControls}
          />
        )}
      </RadioGroup>

      <Flex sx={{ flexDirection: "column" }}>
        <Box m={1} sx={{ flex: 1 }}>
          <Button
            sx={{ width: "100%" }}
            disabled={!formControls.isValid}
            type="submit"
          >
            Filter
          </Button>
        </Box>
        <Box m={1}>
          <Button
            sx={{
              width: "100%",
              backgroundColor: "background",
              color: "secondary",
            }}
            onClick={props.onCancel}
            type="button"
          >
            Cancel
          </Button>
          <Flex sx={{ justifyContent: "flex-end" }}>
            <IconButton type="button" onClick={handleReset}>
              <FontAwesomeIcon icon={faUndo} />
            </IconButton>
          </Flex>
        </Box>
      </Flex>
    </Form>
  );
};
