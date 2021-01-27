import React, { InputHTMLAttributes, LabelHTMLAttributes } from "react";
import { FormErrors } from "./FormErrors";
import { Entity, FormHookAPI, DefaultFieldValues } from "./useForm";
import { Input, Label, Box } from "theme-ui";

interface TextFieldProps<E, F extends keyof E> {
  formControls: FormHookAPI<E>;
  fieldName: F;
  label: string;
  inputAttrs?: InputHTMLAttributes<HTMLInputElement>;
  labelAttrs?: LabelHTMLAttributes<HTMLLabelElement>;
  onRefAttached?: (input: HTMLInputElement) => void;
}

export const useInputRef = (
  handler: (ref: HTMLInputElement) => void,
  ref: React.RefObject<HTMLInputElement>
): void => {
  React.useEffect(() => {
    if (ref.current) {
      handler(ref.current);
    }
  }, [ref.current]);
};

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

  const inputRef = React.createRef<HTMLInputElement>();

  useInputRef(props.onRefAttached || (() => null), inputRef)

  return (
    <Box m={1}>
      <Label {...labelAttrs} htmlFor={inputAttrs?.id}>
        {label}
      </Label>
      <Input
        {...inputAttrs}
        ref={inputRef}
        value={formControls.fieldControls[fieldName].displayValue}
        type="text"
        onChange={inputAttrs?.onChange || handleChange}
        bg={'background'}
      />
      <FormErrors
        isPristine={formControls.isPristine}
        errors={formControls.fieldControls[fieldName].errors}
      />
    </Box>
  );
};
