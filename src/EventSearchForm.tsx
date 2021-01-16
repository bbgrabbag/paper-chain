import React from "react";
import {
  defaultFilterRule,
  EventsContext,
  FilterRuleName,
  UseEventsHookAPI,
} from "./EventsProvider";
import { DefaultFormatterKeys, TextField, Form } from "./lib";
import { useForm } from "./config";
import { SearchEntity } from "./entities";
import { Box, Close } from "theme-ui";

export const useFilterOnSearch = (
  keyword: string | null,
  eventsAPI: UseEventsHookAPI
): void => {
  React.useEffect(() => {
    eventsAPI.filter(
      keyword == null
        ? defaultFilterRule
        : {
            name: FilterRuleName.Search,
            cb: (e) => !!e.name?.toLowerCase().includes(keyword.toLowerCase()),
          }
    );
  }, [keyword]);
};

export const EventSearchForm: React.FC = () => {
  const eventsAPI = React.useContext(EventsContext);
  const formControls = useForm<SearchEntity>(
    {
      keyword: {
        type: DefaultFormatterKeys.Text,
        validators: [],
      },
    },
    { keyword: null }
  );

  useFilterOnSearch(formControls.fieldControls.keyword.rawValue, eventsAPI);

  const handleClear = () => formControls.updateField("keyword", "");

  const showClearButton = formControls.fieldControls.keyword.rawValue !== null;

  return (
    <Form onSubmit={(e) => e.preventDefault()} sx={{ alignItems: "center" }}>
      <Box sx={{ flex: "1 1 auto" }}>
        <TextField
          label={""}
          fieldName={"keyword"}
          formControls={formControls}
          inputAttrs={{ placeholder: "Search" }}
        />
      </Box>
      <Box m={1}>
        {showClearButton && (
          <Close
            sx={{ color: "text" }}
            variant="iconSm"
            type="button"
            onClick={handleClear}
          ></Close>
        )}
      </Box>
    </Form>
  );
};
