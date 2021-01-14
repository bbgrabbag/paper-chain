import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Box, Flex, IconButton } from "theme-ui";
import { CustomRouteParams, PaperChainEventType } from "./entities";
import { EventsContext } from "./EventsProvider";
import { ButtonLink, Loading } from "./lib";
import { formatTimestamp, formatTimestampMetrics } from "./util";
import { Heading, Text } from "theme-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export const EventDetailView: React.FC = () => {
  const route = useRouteMatch<CustomRouteParams>();
  const historyRouter = useHistory();
  const eventAPI = React.useContext(EventsContext);
  const event = eventAPI.getEventById(route.params.id);

  if (event == null)
    return (
      <Flex sx={{ justifyContent: "center" }}>
        <Box>
          <Loading>
            <Text>There was a problem loading the event</Text>
          </Loading>
        </Box>
      </Flex>
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
    <Flex sx={{justifyContent:'center'}}>
      <Box>
        <Heading
          as="h1"
          sx={{ textAlign: "center", padding: "1rem", fontSize: 38 }}
        >
          {fragments.metrics.map((s) => (
            <span style={{ display: "block" }} key={s}>
              {s}
            </span>
          ))}
        </Heading>
        <Heading
          as="h3"
          sx={{ textAlign: "center", fontSize: 24, fontWeight: 350 }}
        >
          {fragments.type}
        </Heading>
        <Heading
          as="h2"
          sx={{ textAlign: "center", padding: "1rem", fontSize: 32 }}
        >
          {fragments.eventName}
        </Heading>
      </Box>
      <Flex
        sx={{
          justifyContent: "space-between",
          position: "fixed",
          width: "100%",
          bottom: "1rem",
          backgroundColor: "transparent",
        }}
      >
        <Box m={1}>
          <ButtonLink variant="icon" to={`/event/${event?.id}/edit`}>
            <FontAwesomeIcon icon={faEdit} />
          </ButtonLink>
        </Box>
        <Box m={1}>
          <IconButton
            variant="icon"
            sx={{ color: "darken" }}
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrash} />
          </IconButton>
        </Box>
      </Flex>
    </Flex>
  );
};
