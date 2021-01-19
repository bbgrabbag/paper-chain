import React, { useContext } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Box, Flex, IconButton } from "theme-ui";
import { CustomRouteParams, PaperChainEventType } from "./entities";
import { EventsContext } from "./EventsProvider";
import { ButtonLink, Loading } from "./lib";
import {
  formatTimestamp,
  formatTimestampMetrics,
  useScrollIntoView,
} from "./util";
import { Heading, Text } from "theme-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faLessThan } from "@fortawesome/free-solid-svg-icons";
import { ConfigContext, TimeFormatOptions } from "./ConfigProvider";
import Moment from "moment";

export const EventDetailView: React.FC = () => {
  const route = useRouteMatch<CustomRouteParams>();
  const historyRouter = useHistory();
  const eventAPI = React.useContext(EventsContext);
  const event = eventAPI.getEventById(route.params.id);
  const configAPI = useContext(ConfigContext);

  const ref = React.createRef<HTMLDivElement>();

  useScrollIntoView();

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

  const renderHeading = () => {
    if (event.elapsed)
      return (
        <Heading
          as="h2"
          sx={{ textAlign: "center", padding: "1rem", fontSize: 28 }}
        >
          <b>{event.name}</b> occurred on{" "}
          <Text sx={{ padding: "1rem" }}>
            {Moment(event.timestamp).format("M/D/YYYY")}
          </Text>
        </Heading>
      );

    const fragments = formatTimestampMetrics(
      formatTimestamp(
        event?.type as PaperChainEventType,
        event?.timestamp as Date,
        configAPI.timeFormat === TimeFormatOptions.DayView
      ),
      event?.type as PaperChainEventType,
      event?.name as string
    );

    return (
      <>
        <Heading
          as="h1"
          sx={{ textAlign: "center", padding: "1rem", fontSize: 38 }}
        >
          {fragments.metrics.map((s) => (
            <span style={{ display: "block" }} key={s}>
              {s.includes("<") && (
                <FontAwesomeIcon size="xs" icon={faLessThan}></FontAwesomeIcon>
              )}
              {s.replace(/</g, "")}
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
          sx={{ textAlign: "center", padding: "1rem", fontSize: 28 }}
        >
          {fragments.eventName}
        </Heading>
        <Text
          sx={{
            textAlign: "center",
            padding: "3rem",
            paddingTop: "6rem",
            fontSize: 16,
          }}
        >
          {event.type === PaperChainEventType.Since
            ? "Occurred on "
            : "Occurs on "}
          {Moment(event.timestamp).format("M/D/YYYY")}
        </Text>
      </>
    );
  };

  return (
    <Flex id="event-detail-view" sx={{ justifyContent: "center" }} ref={ref}>
      <Box sx={{ paddingBottom: "3rem" }}>{renderHeading()}</Box>
      <Flex
        sx={{
          justifyContent: "space-between",
          position: "fixed",
          width: "100%",
          bottom: ".5rem",
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
