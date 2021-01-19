import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Box, Button, Flex, Heading, IconButton } from "theme-ui";
import { SortRule, SortRuleName, useForm } from "./config";
import { SortEntity } from "./entities";
import { EventsContext } from "./EventsProvider";
import { DefaultFormatterKeys, Form, Radio, RadioGroup } from "./lib";

export interface SortFormProps {
  onCancel: (e: React.MouseEvent) => void;
  onSubmit: (e: React.FormEvent, sortRule: SortRule) => void;
}

export const SortForm: React.FC<SortFormProps> = (props) => {
  const eventsApi = React.useContext(EventsContext);
  const formControls = useForm<SortEntity>(
    {
      sortRule: {
        type: DefaultFormatterKeys.Text,
        validators: [],
      },
    },
    { sortRule: eventsApi.sortRule.name }
  );

  const handleSubmit = (e: React.FormEvent): void => {
    props.onSubmit(e, {
      name: formControls.fieldControls.sortRule.rawValue as SortRuleName,
    });
  };

  const handleReset = () => {
    formControls.reset({
      sortRule: SortRuleName.Default,
    });
  };

  return (
    <Form
      id="filter-form"
      onSubmit={handleSubmit}
      sx={{ flexDirection: "column", width: "100%", position: "relative" }}
    >
      <Heading as="h5">Sort By</Heading>
      <RadioGroup
        m={2}
        direction="column"
        isPristine={formControls.fieldControls.sortRule.isPristine}
        errors={formControls.fieldControls.sortRule.errors}
      >
        <Radio
          label="Updated recently"
          fieldName="sortRule"
          radioValue={SortRuleName.Default}
          radioGroup="sort-rule"
          formControls={formControls}
        />
        <Radio
          label="Updated later"
          fieldName="sortRule"
          radioValue={SortRuleName.OldToNew}
          radioGroup="sort-rule"
          formControls={formControls}
        />
        <Radio
          label="Future occurrence"
          fieldName="sortRule"
          radioValue={SortRuleName.FutureToPast}
          radioGroup="sort-rule"
          formControls={formControls}
        />
        <Radio
          label="Past occurrence"
          fieldName="sortRule"
          radioValue={SortRuleName.PastToFuture}
          radioGroup="sort-rule"
          formControls={formControls}
        />
        <Radio
          label="A to Z"
          fieldName="sortRule"
          radioValue={SortRuleName.AtoZ}
          radioGroup="sort-rule"
          formControls={formControls}
        />
        <Radio
          label="Z to A"
          fieldName="sortRule"
          radioValue={SortRuleName.ZtoA}
          radioGroup="sort-rule"
          formControls={formControls}
        />
      </RadioGroup>
      <Flex sx={{ flexDirection: "column" }}>
        <Box m={1} sx={{ flex: 1 }}>
          <Button
            sx={{ width: "100%" }}
            disabled={!formControls.isValid}
            type="submit"
          >
            Sort
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
