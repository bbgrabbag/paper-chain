import React from "react";
import { Flex } from "theme-ui";
import { EventGrid } from "./EventGrid";

export const Dashboard: React.FC = () => {
  return (
    <Flex id="dashboard">
      <EventGrid />
    </Flex>
  );
};
