import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { IconButton } from "theme-ui";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const NavBackActionButton: React.FC = () => {
  const routeHistory = useHistory();
  return (
    <IconButton
      sx={{ color: "primary" }}
      onClick={routeHistory.goBack}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </IconButton>
  );
};
