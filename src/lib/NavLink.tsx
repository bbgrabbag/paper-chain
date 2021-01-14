import React, { ButtonHTMLAttributes } from "react";
import { Link } from "theme-ui";

import { useHistory } from "react-router-dom";

export interface NavLinkProps extends ButtonHTMLAttributes<Element> {
  to: string;
  state?: Record<string, unknown>;
}

export const NavLink: React.FC<React.PropsWithChildren<NavLinkProps>> = (
  props
) => {
  const { to, state, children } = props;
  const historyAPI = useHistory();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    historyAPI.push(to, state);
  };
  return (
    <Link href="" onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};
