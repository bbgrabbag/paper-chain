import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faClock } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "theme-ui";
import { ConfigContext, TimeFormatOptions } from "./ConfigProvider";
import { EventsContext } from "./EventsProvider";

export const TimeFormatActionButton: React.FC = () => {
  const configAPI = React.useContext(ConfigContext);
  const eventsApi = React.useContext(EventsContext);
  
  return configAPI.timeFormat === TimeFormatOptions.DayView ? (
    <IconButton onClick={configAPI.toggleTimeFormat} disabled={!eventsApi.meta.count}>
      <FontAwesomeIcon icon={faCalendarDay} />
    </IconButton>
  ) : (
    <IconButton onClick={configAPI.toggleTimeFormat} disabled={!eventsApi.meta.count}>
      <FontAwesomeIcon icon={faClock} />
    </IconButton>
  );
};
