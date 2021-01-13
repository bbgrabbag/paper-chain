import { CustomFieldValues } from "./config";
import { NullableFields } from "./lib/";

export enum PaperChainEventType {
  Since = "SINCE",
  Until = "UNTIL",
}

export type PaperChainEvent = NullableFields<
  {
    id?: string;
    dateCreated?: Date;
    type: PaperChainEventType;
    name: string;
    timestamp: Date;
  },
  CustomFieldValues
>;

export interface CustomRouteParams {
  id: string;
}

export type SearchEntity = NullableFields<{
  keyword: string;
}, CustomFieldValues>;
