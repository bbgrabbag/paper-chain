import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Flex, Box, IconButton } from "theme-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { TimeFormatSetting } from "./TimeFormatSetting";

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
        <TimeFormatSetting />
      </Flex>
    </Flex>
  );
};
