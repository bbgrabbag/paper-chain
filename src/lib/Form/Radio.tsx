import React, { InputHTMLAttributes, LabelHTMLAttributes } from "react";
import { FormHookAPI, DefaultFieldValues } from "./useForm";
import { Entity } from "./useForm";
import { Radio as RadioUI, Label, Box } from "theme-ui";

export interface RadioProps<E, F extends keyof E> {
  label: string;
  radioGroup: string;
  fieldName: F;
  radioValue: E[F];
  labelAttrs?: LabelHTMLAttributes<HTMLLabelElement>;
  inputAttrs?: InputHTMLAttributes<HTMLInputElement>;
  formControls: FormHookAPI<E>;
}

export const Radio = <
  V extends DefaultFieldValues,
  E extends Entity<V>,
  F extends keyof E
>(
  props: RadioProps<E, F>
): React.ReactElement => {
  const {
    radioGroup,
    radioValue,
    fieldName,
    formControls,
    inputAttrs,
    labelAttrs,
    label,
  } = props;

  const handleChange = () => {
    formControls.updateField(fieldName, radioValue as string);
  };

  return (
    <Box m={1}>
      <Label
        {...labelAttrs}
        sx={{ display: "flex", alignItems: "center" }}
        htmlFor={inputAttrs?.id}
      >
        <RadioUI
          {...inputAttrs}
          name={radioGroup}
          checked={
            radioValue === formControls.fieldControls[fieldName].rawValue
          }
          onChange={props.inputAttrs?.onChange || handleChange}
        />
        {label}
      </Label>
    </Box>
  );
};
