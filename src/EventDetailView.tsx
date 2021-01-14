import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Box, Button, Flex } from "theme-ui";
import { CustomRouteParams, PaperChainEventType } from "./entities";
import { EventsContext } from "./EventsProvider";
import { ButtonLink, Loading } from "./lib";
import { formatTimestamp, formatTimestampMetrics } from "./util";
import { Heading } from "theme-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

export const EventDetailView: React.FC = () => {
  const route = useRouteMatch<CustomRouteParams>();
  const historyRouter = useHistory();
  const eventAPI = React.useContext(EventsContext);
  const event = eventAPI.getEventById(route.params.id);

  if (event == null)
    return (
      <Loading>
        <p>There was a problem loading the event</p>
      </Loading>
    );

  const handleDelete = () => {
    eventAPI.remove(event?.id as string);
    historyRouter.push("/dashboard");
  };

  const fragments = formatTimestampMetrics(
    formatTimestamp(
      event?.type as PaperChainEventType,
      event?.name as string,
      event?.timestamp as Date
    ),
    event?.type as PaperChainEventType,
    event?.name as string
  );

  return (
    <Flex sx={{ flexDirection: "column", height: "100%" }}>
      <Box sx={{flex: 1}}>
        <Heading as="h1" sx={{ textAlign: "center", padding:'3rem', fontSize:56 }}>
          {fragments.metrics}
        </Heading>
        <Heading as="h3" sx={{ textAlign: "center", fontSize:36, fontWeight: 350 }}>
          {fragments.type}
        </Heading>
        <Heading as="h2" sx={{ textAlign: "center", padding:'3rem', fontSize:42 }}>
          {fragments.eventName}
        </Heading>
      </Box>
      <Flex sx={{ justifyContent: "space-between" }}>
        <Box m={1}>
          <ButtonLink variant="icon" to={`/event/${event?.id}/edit`}>
            <FontAwesomeIcon icon={faEdit} />
          </ButtonLink>
        </Box>
        <Box m={1}>
          <Button
            variant="icon"
            sx={{ color: "error" }}
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};
