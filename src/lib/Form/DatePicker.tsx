import React, { InputHTMLAttributes, LabelHTMLAttributes } from "react";
import { FormErrors } from "./FormErrors";

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
  props: DatePickerProps<E, F>
): React.ReactElement => {
  const { label, fieldName, labelAttrs, inputAttrs, formControls } = props;

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
          name={fieldName as string}
          type="date"
          value={formControls.fieldControls[fieldName].displayValue}
          onChange={inputAttrs?.onChange || handleChange}
        />
      </label>
      <FormErrors
        isPristine={formControls.isPristine}
        errors={formControls.fieldControls[fieldName].errors}
      />
    </div>
  );
};
