import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Flex, Box, Text } from "theme-ui";
import { CustomRouteParams, PaperChainEvent } from "./entities";
import { EventDetailForm, EventDetailFormProps } from "./EventDetailForm";
import { EventsContext } from "./EventsProvider";
import { Loading } from "./lib";

export const EventDetailEdit: React.FC = () => {
  const eventAPI = React.useContext(EventsContext);
  const historyRouter = useHistory();
  const route = useRouteMatch<CustomRouteParams>();
  const event = eventAPI.getEventById(route.params.id);

  if (!event)
    return (
      <Flex sx={{ justifyContent: "center" }}>
        <Box>
          <Loading>
            <Text>There was a problem loading the event</Text>
          </Loading>
        </Box>
      </Flex>
    );

  const handleCancel = () => {
    historyRouter.goBack();
  };

  const handleSubmit: EventDetailFormProps["onSubmit"] = (e, updatedEvent) => {
    e.preventDefault();
    eventAPI.edit(route.params.id, updatedEvent);
    historyRouter.goBack();
  };

  return (
    <Flex
      sx={{
        justifyContent: "center",
        margin: "auto",
        width: "85%",
        maxWidth: ["600px"],
      }}
    >
      <EventDetailForm
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        event={event as PaperChainEvent}
        submitLabel="Save"
      />
    </Flex>
  );
};
