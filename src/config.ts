import {
  FilterByCategory,
  FilterByOccurence,
  PaperChainEvent,
  PaperChainEventType,
} from "./entities";
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
import Moment from "moment";

/**********************************************************************************************************
 *                                          FORM CONFIGURATIONS
 * *******************************************************************************************************/

export type CustomFieldValues =
  | DefaultFieldValues
  | PaperChainEventType
  | SortRuleName;
export enum DateRange {
  PaperChainEventType = "PAPER_CHAIN_EVENT_TYPE",
}
export enum FilterByDate {
  Occurrence = "OCCURRENCE",
}
export type CustomValidatorKeys =
  | DefaultValidatorKeys
  | DateRange
  | FilterByDate;
export const CustomValidatorKeys = {
  ...DefaultValidatorKeys,
  ...DateRange,
  ...FilterByDate,
};

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
  [FilterByDate.Occurrence]: (d, formControls) => {
    if (d == null) {
      if ("byOccurrence" in formControls && "filterDate" in formControls) {
        if (formControls.byOccurrence.rawValue === FilterByOccurence.Whenever)
          return true;
        return "This field is required";
      } else
        throw `Invalid form control configuration. Missing 'byOccurence' and 'filterDate' fields`;
    }
    if (!(d instanceof Date)) return `Invalid field value: ${d}. Must be Date`;
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

/**********************************************************************************************************
 *                                        LOCAL STORAGE CONFIGURATIONS
 * *******************************************************************************************************/

export const PaperChainEventsStorageKey = "PAPER_CHAIN_EVENTS";
export const PaperChainTimeFormatKey = "PAPER_CHAIN_TIME_FORMAT";
export const PaperChainFilterStorageKey = "PAPER_CHAIN_FILTERS";
export const PaperChainSortStorageKey = "PAPER_CHAIN_SORT_RULE";

/**********************************************************************************************************
 *                                        EVENT FILTER CONFIGURATIONS
 * *******************************************************************************************************/

export enum FilterRuleName {
  Search = "SEARCH",
  Category = "CATEGORY",
  Occurrence = "OCCURRENCE",
}

export type FilterRuleCallbacks = {
  [FilterRuleName.Category]: (
    e: PaperChainEvent,
    category: FilterByCategory,
    i?: number
  ) => boolean;
  [FilterRuleName.Occurrence]: (
    e: PaperChainEvent,
    occurrence: FilterByOccurence,
    filterDate: Date | null,
    i?: number
  ) => boolean;
  [FilterRuleName.Search]: (
    e: PaperChainEvent,
    keyword: string,
    i?: number
  ) => boolean;
};

export interface SearchFilterRule {
  name: FilterRuleName.Search;
  keyword: string;
}
export interface CategoryFilterRule {
  name: FilterRuleName.Category;
  category: FilterByCategory;
}

export interface OccurrenceFilterRule {
  name: FilterRuleName.Occurrence;
  occurrence: FilterByOccurence;
  date: Date | null;
}

export type FilterRule =
  | OccurrenceFilterRule
  | SearchFilterRule
  | CategoryFilterRule;

export const filterRuleCallbacks: FilterRuleCallbacks = {
  [FilterRuleName.Search]: (e, keyword) =>
    !!e.name?.toLowerCase().includes(keyword.toLowerCase()),
  [FilterRuleName.Category]: (e, category) => {
    switch (category) {
      case FilterByCategory.All:
        return true;
      case FilterByCategory.Elapsed:
        return !!e.elapsed;
      case FilterByCategory.Since:
        return e.type === PaperChainEventType.Since;
      case FilterByCategory.Until:
        return e.type === PaperChainEventType.Until;
    }
  },
  [FilterRuleName.Occurrence]: (e, occ, date) => {
    switch (occ) {
      case FilterByOccurence.Whenever:
        return true;
      case FilterByOccurence.Before:
        return Moment(e.timestamp).isBefore(date);
      case FilterByOccurence.After:
        return Moment(e.timestamp).isAfter(date);
    }
  },
};


/**********************************************************************************************************
 *                                        EVENT SORT CONFIGURATIONS
 * *******************************************************************************************************/

export enum SortRuleName {
  Default = "DEFAULT",
  OldToNew = "OLD_TO_NEW",
  AtoZ = "A_TO_Z",
  ZtoA = "Z_TO_A",
  FutureToPast = "FUTURE_TO_PAST",
  PastToFuture = "PAST_TO_FUTURE",
}

export type SortRule = {
  name: SortRuleName;
};

export type SortRuleCallbacks = {
  [K in SortRuleName]: (
    e1: PaperChainEvent,
    e2: PaperChainEvent,
    i?: number
  ) => number;
};

export const defaultSortRule: SortRule = {
  name: SortRuleName.Default,
};

export const sortRuleCallbacks: SortRuleCallbacks = {
  [SortRuleName.Default]: (e1: PaperChainEvent, e2: PaperChainEvent) => {
    const t1lastCreatedOrModified = e1.dateModified || e2.dateCreated;
    const t2lastCreatedOrModified = e2.dateModified || e2.dateCreated;

    return Moment(t1lastCreatedOrModified).isAfter(t2lastCreatedOrModified)
      ? -1
      : Moment(t1lastCreatedOrModified).isBefore(t2lastCreatedOrModified)
      ? 1
      : 0;
  },
  [SortRuleName.OldToNew]: (e1: PaperChainEvent, e2: PaperChainEvent) => {
    const t1lastCreatedOrModified = e1.dateModified || e2.dateCreated;
    const t2lastCreatedOrModified = e2.dateModified || e2.dateCreated;

    return Moment(t1lastCreatedOrModified).isAfter(t2lastCreatedOrModified)
      ? 1
      : Moment(t1lastCreatedOrModified).isBefore(t2lastCreatedOrModified)
      ? -1
      : 0;
  },
  [SortRuleName.AtoZ]: (e1: PaperChainEvent, e2: PaperChainEvent) => {
    if (!e1.name) return -1;
    if (!e2.name) return 1;
    return e1.name.localeCompare(e2.name);
  },
  [SortRuleName.ZtoA]: (e1: PaperChainEvent, e2: PaperChainEvent) => {
    if (!e1.name) return 1;
    if (!e2.name) return -1;
    return e2.name.localeCompare(e1.name);
  },
  [SortRuleName.FutureToPast]: (e1: PaperChainEvent, e2: PaperChainEvent) => {
    return Moment(e1.timestamp).isAfter(e2.timestamp)
      ? -1
      : Moment(e1.timestamp).isBefore(e2.timestamp)
      ? 1
      : 0;
  },
  [SortRuleName.PastToFuture]: (e1: PaperChainEvent, e2: PaperChainEvent) => {
    return Moment(e1.timestamp).isAfter(e2.timestamp)
      ? 1
      : Moment(e1.timestamp).isBefore(e2.timestamp)
      ? -1
      : 0;
  },
};
