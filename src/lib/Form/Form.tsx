import React, { FormHTMLAttributes } from "react";


export const Form: React.FC<
  React.PropsWithChildren<FormHTMLAttributes<HTMLFormElement>>
> = (props) => {
  const {children, ...attrs} = props;
  return <form {...attrs}>{children}</form>;
};
