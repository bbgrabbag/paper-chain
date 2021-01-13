import React, { InputHTMLAttributes, LabelHTMLAttributes } from "react";
import { FormErrors } from "./FormErrors";
import { Entity, FormHookAPI, DefaultFieldValues } from "./useForm";

interface TextFieldProps<E, F extends keyof E> {
  formControls: FormHookAPI<E>;
  fieldName: F;
  label: string;
  inputAttrs?: InputHTMLAttributes<HTMLInputElement>;
  labelAttrs?: LabelHTMLAttributes<HTMLLabelElement>;
}

export const TextField = <
  V extends DefaultFieldValues,
  E extends Entity<V>,
  F extends keyof E
>(
  props: TextFieldProps<E, F>
): React.ReactElement => {
  const { formControls, fieldName, label, inputAttrs, labelAttrs } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    formControls.updateField(fieldName, target.value);
  };

  return (
    <div>
      <label {...labelAttrs} htmlFor={inputAttrs?.id}>
        {label}
        <input
          {...inputAttrs}
          value={formControls.fieldControls[fieldName].displayValue}
          type="text"
          onChange={inputAttrs?.onChange || handleChange}
        />
        <FormErrors
          isPristine={formControls.isPristine}
          errors={formControls.fieldControls[fieldName].errors}
        />
      </label>
    </div>
  );
};
