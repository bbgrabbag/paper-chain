import React from "react";

export interface FormErrorsProps {
  errors: string[];
  isPristine: boolean;
}

export const FormErrors: React.FC<FormErrorsProps> = (props) => {
  return (
    <div>
      {props.isPristine
        ? []
        : props.errors.map((err, i) => <span key={i}>{err}</span>)}
    </div>
  );
};
