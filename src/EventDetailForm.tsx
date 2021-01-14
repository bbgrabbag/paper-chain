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
import { Button, Flex, Box } from "theme-ui";

export interface EventDetailFormProps {
  event?: PaperChainEvent;
  formAttrs?: FormHTMLAttributes<HTMLFormElement>;
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    paperChainEvent: PaperChainEvent
  ) => void;
  onCancel: (e: React.MouseEvent) => void;
}

export const EventDetailForm: React.FC<
  React.PropsWithChildren<EventDetailFormProps>
> = (props) => {
  const {
    event,
    onSubmit,
    onCancel,
    submitLabel,
    cancelLabel,
    formAttrs,
  } = props;
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
        validators: [
          CustomValidatorKeys.Required,
          CustomValidatorKeys.PaperChainEventType,
        ],
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
    <Form
      {...formAttrs}
      sx={{ flexDirection: "column", width: "100%" }}
      onSubmit={formAttrs?.onSubmit || handleSubmit}
    >
      <Flex sx={{ alignItems: "center" }}>
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
      </Flex>
      <TextField
        fieldName={"name"}
        label={"Event Name"}
        formControls={formControls}
      />
      <Box>
        <DatePicker
          label={"Event Date"}
          fieldName={"timestamp"}
          formControls={formControls}
        />
      </Box>
      <Flex>
        <Box m={1} sx={{ flex: 1 }}>
          <Button
            sx={{ width: "100%" }}
            disabled={!formControls.isValid}
            type="submit"
          >
            {submitLabel || "Submit"}
          </Button>
        </Box>
        <Box m={1} sx={{ flex: 1 }}>
          <Button
            sx={{
              width: "100%",
              backgroundColor: "background",
              color: "secondary",
            }}
            onClick={onCancel}
            type="button"
          >
            {cancelLabel || "Cancel"}
          </Button>
        </Box>
      </Flex>
    </Form>
  );
};
