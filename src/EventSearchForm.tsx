import React from "react";
import { EventsContext, UseEventsHookAPI } from "./EventsProvider";
import { DefaultFormatterKeys, TextField, Form } from "./lib";
import { useForm } from "./config";
import { SearchEntity } from "./entities";
import { Box, Button } from "theme-ui";

export const useFilterOnSearch = (
  keyword: string | null,
  eventsAPI: UseEventsHookAPI
): void => {
  React.useEffect(() => {
    eventsAPI.filter({
      cb: (e) =>
        keyword == null ||
        !!e.name?.toLowerCase().includes(keyword.toLowerCase()),
    });
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

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Box sx={{ flex: "1 1 auto" }}>
        <TextField
          label={""}
          fieldName={"keyword"}
          formControls={formControls}
          inputAttrs={{ placeholder: "Search" }}
        />
      </Box>
      <Box m={1}>
        <Button type="button" onClick={handleClear}>
          Clear
        </Button>
      </Box>
    </Form>
  );
};
