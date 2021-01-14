import React from "react";
import { EventGridDetail } from "./EventGridDetail";
import { EventDetailAdd } from "./EventDetailAdd";
import { EventsContext } from "./EventsProvider";
import { EventSearchForm } from "./EventSearchForm";
import { Flex, Box } from "theme-ui";

export const EventGrid: React.FC = () => {
  const eventsAPI = React.useContext(EventsContext);

  const renderEventList = (): React.ReactElement[] => {
    return eventsAPI.events
      .filter(eventsAPI.filterRule.cb)
      .map((e) => <EventGridDetail key={e.id} event={e} />);
  };

  return (
    <Flex
      className="event-grid"
      sx={{ flexDirection: "column", height: "100%", overflow: "hidden", width: '100%' }}
    >
      <Box m={1}>
        <EventSearchForm />
        {/* <button>Sort</button>
        <button>Filter</button> */}
      </Box>

      <Box
        m={1}
        sx={{ height: "90%", overflowY: "scroll", paddingBottom: 100 }}
      >
        <Flex sx={{ flexDirection: "column" }}>{renderEventList()}</Flex>
      </Box>
      <Box m={1} sx={{ position: "fixed", bottom: 16 }}>
        <EventDetailAdd />
      </Box>
    </Flex>
  );
};
