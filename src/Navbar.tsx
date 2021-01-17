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
          <Box sx={{margin: '3px'}}>
            <IconButton>
              <FontAwesomeIcon icon={faSortAlphaUp} />
            </IconButton>
          </Box>
        )}
        {showOnRoutes([/unreleased/]) && (
          <Box sx={{margin: '3px'}}>
            <FilterActionButton />
          </Box>
        )}
        {showOnRoutes([/dashboard/, /view/]) && (
          <Box sx={{margin: '3px'}}>
            <TimeFormatActionButton />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};
