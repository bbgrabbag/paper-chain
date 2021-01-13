import React, { InputHTMLAttributes, LabelHTMLAttributes } from "react";
import { FormHookAPI, DefaultFieldValues } from "./useForm";
import { Entity } from "./useForm";

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
    <div>
      <label {...labelAttrs} htmlFor={inputAttrs?.id}>
        {label}
        <input
          {...inputAttrs}
          type="radio"
          name={radioGroup}
          checked={
            radioValue === formControls.fieldControls[fieldName].rawValue
          }
          onChange={props.inputAttrs?.onChange || handleChange}
        />
      </label>
    </div>
  );
};
