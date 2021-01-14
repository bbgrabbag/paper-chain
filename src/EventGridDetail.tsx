import React from "react";
import { PaperChainEvent, PaperChainEventType } from "./entities";
import { EventsContext } from "./EventsProvider";
import { ButtonLink, NavLink } from "./lib";
import { formatTimestampMetrics, formatTimestamp } from "./util";
import { IconButton, Flex, Box, Card, Text } from "theme-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faLessThan, faTrash } from "@fortawesome/free-solid-svg-icons";

export interface EventGridDetailProps {
  event: PaperChainEvent;
}

export const EventGridDetail: React.FC<
  React.PropsWithChildren<EventGridDetailProps>
> = (props) => {
  const eventAPI = React.useContext(EventsContext);

  const handleDelete = () => {
    eventAPI.remove(props.event?.id as string);
  };

  const displayEventTimestamp = () => {
    const metrics = formatTimestamp(
      props.event.type as PaperChainEventType,
      props.event.name as string,
      props.event.timestamp as Date
    );

    const fragments = formatTimestampMetrics(
      metrics,
      props.event.type as PaperChainEventType,
      props.event.name as string,
      true
    );

    const renderMetrics = () => {
      const text = fragments.metrics.join(" ");
      return (
        <>
          {text.includes("<") && (
            <FontAwesomeIcon size="xs" icon={faLessThan}></FontAwesomeIcon>
          )}
          {text.replace(/</g, "")}
        </>
      );
    };

    return (
      <>
        <Text sx={{ color: "secondary", fontSize: 4 }}>{renderMetrics()}</Text>
        <Text sx={{ display: "inline" }}>{fragments.type} </Text>
        <Text sx={{ display: "inline", fontWeight: "bold", fontSize: 2 }}>
          {fragments.eventName}
        </Text>
      </>
    );
  };

  return (
    <Card
      className="event-grid-detail"
      variant={
        props.event.type === PaperChainEventType.Since ? "since" : "until"
      }
      m={2}
    >
      <Flex sx={{ flexDirection: "column", position: "relative" }}>
        <Box m={1} sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          <NavLink
            sx={{ width: "100%", paddingBottom: "3rem" }}
            to={`/event/${props.event.id}/view`}
          >
            {displayEventTimestamp()}
          </NavLink>
        </Box>
        <Flex
          sx={{
            justifyContent: "flex-end",
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <Box m={1}>
            <ButtonLink variant={"iconSm"} to={`/event/${props.event.id}/edit`}>
              <FontAwesomeIcon icon={faEdit} />
            </ButtonLink>
          </Box>
          <Box m={1}>
            <IconButton
              variant={"iconSm"}
              sx={{ color: "darken" }}
              onClick={handleDelete}
            >
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          </Box>
        </Flex>
      </Flex>
    </Card>
  );
};
