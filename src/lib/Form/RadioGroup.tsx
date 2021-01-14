import React from "react";
import { FormErrors } from "./FormErrors";
import { Flex, Box, FlexProps } from "theme-ui";

export interface RadioGroupProps {
  errors: string[];
  isPristine: boolean;
  direction?: "row" | "column";
}

export const RadioGroup: React.FC<
  React.PropsWithChildren<RadioGroupProps & FlexProps>
> = ({ errors, isPristine, children, direction = "row", ...attrs }) => {
  return (
    <Flex {...attrs}>
      <Flex sx={{flexDirection: 'column'}}>
        <Flex m={1} sx={{ flexDirection: direction }}>
          {React.Children.map(children, (child, i) => (
            <Box m={1} key={i}>
              {child}
            </Box>
          ))}
        </Flex>
        <FormErrors errors={errors} isPristine={isPristine} />
      </Flex>
    </Flex>
  );
};
