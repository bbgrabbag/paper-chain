import React from "react";
import { EventGridDetail } from "./EventGridDetail";
import { EventDetailAdd } from "./EventDetailAdd";
import { EventsContext } from "./EventsProvider";
import { EventSearchForm } from "./EventSearchForm";
import { Flex, Box, Text } from "theme-ui";

export const EventGrid: React.FC = () => {
  const eventsAPI = React.useContext(EventsContext);

  const renderEventList = (): React.ReactElement[] | React.ReactElement => {
    const eventList = eventsAPI.events.map((e) => (
      <EventGridDetail key={e.id} event={e} />
    ));

    return eventsAPI.meta.count ? (
      eventList
    ) : (
      <Flex sx={{flexDirection:'column', justifyContent:'center', minHeight:'300px'}}>
        <Text sx={{ textAlign: "center" }}>
          You do not have any paper chains.
        </Text>
        <Text sx={{ textAlign: "center" }}>Create a new chain below!</Text>
      </Flex>
    );
  };

  return (
    <Flex
      id="event-grid"
      sx={{ flexDirection: "column", width: "100%" }}
    >
      <Box>
        <EventSearchForm />
      </Box>
      <Box>
        <Flex sx={{ flexDirection: "column", paddingBottom: "4.5rem" }}>
          {renderEventList()}
        </Flex>
      </Box>
      <Box sx={{ position: "fixed", bottom: "1.5rem", left: "1rem" }}>
        <EventDetailAdd />
      </Box>
    </Flex>
  );
};
