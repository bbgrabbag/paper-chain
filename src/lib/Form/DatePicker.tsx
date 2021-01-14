import React, { InputHTMLAttributes, LabelHTMLAttributes } from "react";
import { FormErrors } from "./FormErrors";
import { Input, Box, BoxProps } from "theme-ui";
import { FormHookAPI, Entity, DefaultFieldValues } from "./useForm";

export interface DatePickerProps<E, F extends keyof E> {
  label: string;
  fieldName: F;
  labelAttrs?: LabelHTMLAttributes<HTMLLabelElement>;
  inputAttrs?: InputHTMLAttributes<HTMLInputElement>;
  formControls: FormHookAPI<E>;
}

export const DatePicker = <
  V extends DefaultFieldValues,
  E extends Entity<V>,
  F extends keyof E
>(
  props: DatePickerProps<E, F> & BoxProps
): React.ReactElement => {
  const { label, fieldName, labelAttrs, inputAttrs, formControls, ...boxAttrs } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    formControls.updateField(fieldName, target.value);
  };

  return (
    <Box m={1} {...boxAttrs}>
      <label {...labelAttrs} htmlFor={inputAttrs?.id}>
        {label}
      </label>
      <Input
        {...inputAttrs}
        name={fieldName as string}
        type="date"
        value={formControls.fieldControls[fieldName].displayValue}
        onChange={inputAttrs?.onChange || handleChange}
      />
      <FormErrors
        isPristine={formControls.isPristine}
        errors={formControls.fieldControls[fieldName].errors}
      />
    </Box>
  );
};
