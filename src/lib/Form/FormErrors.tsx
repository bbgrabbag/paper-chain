import React from "react";
import { Flex, Text } from "theme-ui";

export interface FormErrorsProps {
  errors: string[];
  isPristine: boolean;
}

export const FormErrors: React.FC<FormErrorsProps> = (props) => {
  return (
    <Flex>
      {props.isPristine
        ? []
        : props.errors.map((err, i) => (
            <Text sx={{ color: "error" }} key={i}>
              {err}
            </Text>
          ))}
    </Flex>
  );
};
