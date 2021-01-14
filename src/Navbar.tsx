import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Flex, Box, IconButton } from "theme-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendarDay,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const routeHistory = useHistory();

  const hide = location.pathname === "/dashboard";

  return (
    <Flex className="navbar">
      {hide ? null : (
        <Box sx={{ flex: 1 }}>
          <IconButton
            variant="icon"
            sx={{ color: "primary" }}
            onClick={routeHistory.goBack}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </IconButton>
        </Box>
      )}
      <Flex sx={{ flex: "auto", justifyContent: "flex-end" }}>
        {/* <IconButton>
          <FontAwesomeIcon icon={faCalendarDay} />
        </IconButton> */}
        {/* <IconButton>
          <FontAwesomeIcon icon={faClock} />
        </IconButton> */}
      </Flex>
    </Flex>
  );
};
