import React from "react";
import { FormErrors } from "./FormErrors";

export interface RadioGroupProps {
  errors: string[];
  isPristine: boolean;
}

export const RadioGroup: React.FC<React.PropsWithChildren<RadioGroupProps>> = (
  props
) => {
  return (
    <div>
      <div>
        {React.Children.map(props.children, (child, i) => (
          <div key={i}>{child}</div>
        ))}
      </div>
      <FormErrors errors={props.errors} isPristine={props.isPristine} />
    </div>
  );
};
