import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faClock } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "theme-ui";
import { ConfigContext, TimeFormatOptions } from "./ConfigProvider";

export const TimeFormatActionButton: React.FC = () => {
  const configAPI = React.useContext(ConfigContext);
  
  return configAPI.timeFormat === TimeFormatOptions.DayView ? (
    <IconButton variant="iconSm" onClick={configAPI.toggleTimeFormat}>
      <FontAwesomeIcon icon={faCalendarDay} />
    </IconButton>
  ) : (
    <IconButton variant="iconSm" onClick={configAPI.toggleTimeFormat}>
      <FontAwesomeIcon icon={faClock} />
    </IconButton>
  );
};
