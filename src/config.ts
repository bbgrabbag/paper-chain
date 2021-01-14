import { PaperChainEventType } from "./entities";
import {
  useFormFactory,
  defaultFormatterMap,
  defaultValidatorMap,
  DefaultFieldValues,
  DefaultFormatterKeys,
  DefaultValidatorKeys,
  FormatterMap,
  ValidatorMap,
} from "./lib/";

export type CustomFieldValues = DefaultFieldValues | PaperChainEventType;
export enum DateRange {
  PaperChainEventType = "PAPER_CHAIN_EVENT_TYPE",
}
export type CustomValidatorKeys = DefaultValidatorKeys | DateRange;
export const CustomValidatorKeys = {...DefaultValidatorKeys, ...DateRange};

const formatterMap: FormatterMap<DefaultFormatterKeys, CustomFieldValues> = {
  ...defaultFormatterMap,
};
const validatorMap: ValidatorMap<CustomValidatorKeys, CustomFieldValues> = {
  ...defaultValidatorMap,
  [DateRange.PaperChainEventType]: (d, formControls) => {
    if (d == null) return "";
    if (!(d instanceof Date)) return `Invalid field value: ${d}. Must be Date`;
    if ("type" in formControls) {
      const ms = d.getTime();
      const today = new Date().getTime();
      if (formControls.type.rawValue === PaperChainEventType.Since)
        return ms <= today || "Date must be before today";
      if (formControls.type.rawValue === PaperChainEventType.Until)
        return ms > today || "Date must be after today";
    }
    return true;
  },
};

export const useForm = useFormFactory<
  CustomValidatorKeys,
  CustomFieldValues,
  DefaultFormatterKeys
>({
  formatterMap,
  validatorMap,
});

export const PaperChainEventsStorageKey = "PAPER_CHAIN_EVENTS";
export const PaperChainTimeFormatKey = 'PAPER_CHAIN_TIME_FORMAT';

