import React from "react";
import { useLocation } from "react-router-dom";
import { Flex, Box } from "theme-ui";
import { TimeFormatActionButton } from "./TimeFormatActionButton";
import { NavBackActionButton } from "./NavBackActionButton";
import { FilterActionButton } from "./FilterActionButton";
import { SortActionButton } from "./SortActionButton";

export const Navbar: React.FC = () => {
  const location = useLocation();

  const showOnRoutes = (pathnames: RegExp[]): boolean => {
    return pathnames.some((reg) => reg.test(location.pathname));
  };

  return (
    <Flex id="navbar">
      <Box sx={{ flex: 1 }}>
        {!showOnRoutes([/dashboard/]) && <NavBackActionButton />}
      </Box>
      <Flex sx={{ flex: "auto", justifyContent: "flex-end" }}>
        {showOnRoutes([/dashboard/]) && (
          <Box sx={{ margin: "3px" }}>
            <SortActionButton />
          </Box>
        )}
        {showOnRoutes([/dashboard/]) && (
          <Box sx={{ margin: "3px" }}>
            <FilterActionButton />
          </Box>
        )}
        {showOnRoutes([/dashboard/, /view/]) && (
          <Box sx={{ margin: "3px" }}>
            <TimeFormatActionButton />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};
