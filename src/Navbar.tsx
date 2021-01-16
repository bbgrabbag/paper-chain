import React from "react";
import { useLocation } from "react-router-dom";
import { Flex, Box, IconButton } from "theme-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";
import { TimeFormatActionButton } from "./TimeFormatActionButton";
import { NavBackActionButton } from "./NavBackActionButton";
import { FilterActionButton } from "./FilterActionButton";

export const Navbar: React.FC = () => {
  const location = useLocation();

  const showOnRoutes = (pathnames: RegExp[]): boolean => {
    return pathnames.some((reg) => reg.test(location.pathname));
  };

  return (
    <Flex className="navbar">
      <Box sx={{ flex: 1 }}>
        {!showOnRoutes([/dashboard/]) && <NavBackActionButton />}
      </Box>
      <Flex sx={{ flex: "auto", justifyContent: "flex-end" }}>
        {showOnRoutes([/unreleased/]) && (
          <IconButton variant="iconSm">
            <FontAwesomeIcon icon={faSortAlphaUp} />
          </IconButton>
        )}
        {showOnRoutes([/unreleased/]) && <FilterActionButton />}
        {showOnRoutes([/dashboard/, /view/]) && <TimeFormatActionButton />}
      </Flex>
    </Flex>
  );
};
