import { CustomFieldValues, SortRuleName } from "./config";
import { NullableFields } from "./lib/";

export enum PaperChainEventType {
  Since = "SINCE",
  Until = "UNTIL",
}

export type PaperChainEvent = NullableFields<
  {
    id?: string;
    dateCreated?: Date;
    dateModified?: Date;
    type: PaperChainEventType;
    name: string;
    timestamp: Date;
    elapsed?: boolean;
  },
  CustomFieldValues
>;

export interface CustomRouteParams {
  id: string;
}

export type SearchEntity = NullableFields<
  {
    keyword: string;
  },
  CustomFieldValues
>;

export enum FilterByCategory {
  Since = "SINCE",
  Until = "UNTIL",
  Elapsed = "ELAPSED",
  All = "ALL",
}

export enum FilterByOccurence {
  Before = "BEFORE",
  After = "AFTER",
  Whenever = "WHENEVER",
}

export type FilterEntity = NullableFields<
  {
    byCategory: FilterByCategory;
    byOccurrence: FilterByOccurence;
    filterDate: Date;
  },
  CustomFieldValues
>;

export type SortEntity = NullableFields<
  {
    sortRule: SortRuleName;
  },
  CustomFieldValues
>;
