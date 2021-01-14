import React, { FormHTMLAttributes } from "react";
import { Flex } from "theme-ui";

export const Form: React.FC<
  React.PropsWithChildren<FormHTMLAttributes<HTMLFormElement & HTMLDivElement>>
> = (props) => {
  const { children, ...attrs } = props;
  return (
    <Flex as="form" m={1} {...attrs}>
      {children}
    </Flex>
  );
};
