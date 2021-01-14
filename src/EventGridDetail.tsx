import React from "react";
import { PaperChainEvent, PaperChainEventType } from "./entities";
import { EventsContext } from "./EventsProvider";
import { ButtonLink, NavLink } from "./lib";
import { formatTimestampMetrics, formatTimestamp } from "./util";
import { Button, Flex, Box, Card, Text } from "theme-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

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
    return (
      <>
        <Text sx={{ color: "secondary", fontSize: 3 }}>{fragments.metrics}</Text>
        <Text sx={{ display: "inline" }}>{fragments.type} </Text>
        <Text sx={{ display: "inline", fontWeight: "bold" }}>
          {fragments.eventName}
        </Text>
      </>
    );

    // `${fragments.metrics} ${fragments.type} ${fragments.eventName}`;
  };

  return (
    <Card m={1}>
      <Flex sx={{ alignItems: "center" }}>
        <Box m={1} sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          <NavLink sx={{ width: "100%" }} to={`/event/${props.event.id}/view`}>
            {displayEventTimestamp()}
          </NavLink>
        </Box>
        <Box m={1}>
          <ButtonLink variant={"iconSm"} to={`/event/${props.event.id}/edit`}>
            <FontAwesomeIcon icon={faEdit} />
          </ButtonLink>
        </Box>
        <Box m={1}>
          <Button
            variant={"iconSm"}
            sx={{ color: "error" }}
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Box>
      </Flex>
    </Card>
  );
};
