import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faClock } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "theme-ui";
import { ConfigContext, TimeFormatOptions } from "./ConfigProvider";
import { useLocation } from "react-router-dom";

export const TimeFormatSetting: React.FC = () => {
  const configAPI = React.useContext(ConfigContext);
  const location = useLocation();

  const hide = ![/dashboard/, /view/].some((reg) =>
    reg.test(location.pathname)
  );

  if (hide) return null;
  
  return configAPI.timeFormat === TimeFormatOptions.DayView ? (
    <IconButton variant="icon" onClick={configAPI.toggleTimeFormat}>
      <FontAwesomeIcon icon={faCalendarDay} />
    </IconButton>
  ) : (
    <IconButton variant="icon" onClick={configAPI.toggleTimeFormat}>
      <FontAwesomeIcon icon={faClock} />
    </IconButton>
  );
};
