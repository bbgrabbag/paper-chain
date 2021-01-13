import React, { FormHTMLAttributes } from "react";
import {
  DefaultFormatterKeys,
  Form,
  Radio,
  TextField,
  DatePicker,
} from "./lib";
import { useForm, CustomValidatorKeys } from "./config";
import { PaperChainEvent, PaperChainEventType } from "./entities";
import { RadioGroup } from "./lib/Form/RadioGroup";

export interface EventDetailFormProps {
  event?: PaperChainEvent;
  formAttrs?: FormHTMLAttributes<HTMLFormElement>;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    paperChainEvent: PaperChainEvent
  ) => void;
  onCancel: (e: React.MouseEvent) => void;
}

export const EventDetailForm: React.FC<
  React.PropsWithChildren<EventDetailFormProps>
> = (props) => {
  const { event, onSubmit, onCancel, formAttrs } = props;
  const formControls = useForm(
    {
      name: {
        type: DefaultFormatterKeys.Text,
        validators: [CustomValidatorKeys.Required],
      },
      type: {
        type: DefaultFormatterKeys.Text,
        validators: [CustomValidatorKeys.Required],
      },
      timestamp: {
        type: DefaultFormatterKeys.Date,
        validators: [CustomValidatorKeys.Required,CustomValidatorKeys.PaperChainEventType],
      },
    },
    event || {
      name: null,
      type: null,
      timestamp: null,
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmit(e, formControls.entity);
  };

  return (
    <Form {...formAttrs} onSubmit={formAttrs?.onSubmit || handleSubmit}>
      <TextField
        fieldName={"name"}
        label={"Event Name"}
        formControls={formControls}
      />
      <RadioGroup
        errors={formControls.fieldControls.type.errors}
        isPristine={formControls.isPristine}
      >
        <Radio
          label="Since"
          radioGroup={"paper-chain-type"}
          radioValue={PaperChainEventType.Since}
          fieldName={"type"}
          formControls={formControls}
        />
        <Radio
          label="Until"
          radioGroup={"paper-chain-type"}
          radioValue={PaperChainEventType.Until}
          fieldName={"type"}
          formControls={formControls}
        />
      </RadioGroup>

      <DatePicker
        label={"Event Date"}
        fieldName={"timestamp"}
        formControls={formControls}
      />
      <button disabled={!formControls.isValid} type="submit">
        Submit
      </button>
      <button onClick={onCancel} type="button">
        Cancel
      </button>
    </Form>
  );
};
