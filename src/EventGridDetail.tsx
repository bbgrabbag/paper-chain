import React from "react";
import { PaperChainEvent, PaperChainEventType } from "./entities";
import { EventsContext } from "./EventsProvider";

import { ButtonLink } from "./lib";
import { Link } from "react-router-dom";
import {
  formatTimestampMetrics,
  formatTimestamp,
} from "./util";

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
      props.event.timestamp as Date,
    );
    const fragments = formatTimestampMetrics(
      metrics,
      props.event.type as PaperChainEventType,
      props.event.name as string,
      true
    );
    return `${fragments.metrics} ${fragments.type} ${fragments.eventName}`;
  };

  return (
    <div>
      <Link to={`/event/${props.event.id}/view`}>
        <span>{displayEventTimestamp()}</span>
      </Link>
      <span>
        <ButtonLink to={`/event/${props.event.id}/edit`}>Edit</ButtonLink>
      </span>
      <span>
        <button onClick={handleDelete}>X</button>
      </span>
    </div>
  );
};
