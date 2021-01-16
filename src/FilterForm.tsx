import React from "react";
import { Button, Flex, Heading } from "theme-ui";
import { Form } from "./lib";

export const FilterForm: React.FC = () => {
  return (
    <Form sx={{flexDirection:'column', width: '100%'}}>
      <Heading>Filter By</Heading>
      {/* timestamp after / before certain date */}
      {/* by type */}
      {/* createdBy since date */}
      <Flex sx={{ flexDirection: "column" }}>
        <Button>Filter</Button>
        <Button>Cancel</Button>
      </Flex>
    </Form>
  );
};
