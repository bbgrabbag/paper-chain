import React from "react";
import { PaperChainEvent, PaperChainEventType } from "./entities";
import { generateUuid, isElapsed } from "./util";
import { PaperChainEventsStorageKey } from "./config";
import Moment from "moment";

export const EventsContext = React.createContext({} as UseEventsHookAPI);

export enum FilterRuleName {
  Default = "DEFAULT",
  Search = "SEARCH",
}

export enum SortRuleName {
  Default = "DEFAULT",
}

export type FilterRule = {
  cb: (e: PaperChainEvent, i?: number) => boolean;
  name: FilterRuleName;
};
export type SortRule = {
  name: SortRuleName;
  cb: (p1: PaperChainEvent, p2: PaperChainEvent, i?: number) => 1 | 0 | -1;
};

export interface UseEventsHookAPI {
  events: PaperChainEvent[];
  setEvents: React.Dispatch<React.SetStateAction<PaperChainEvent[]>>;
  create: (e: PaperChainEvent) => void;
  remove: (eventId: string) => void;
  getEventById: (id: string) => PaperChainEvent | null;
  edit: (id: string, event: PaperChainEvent) => void;
  filter: (rule: FilterRule) => void;
  sort: (rule: SortRule) => void;
  filterRule: FilterRule;
  sortRule: SortRule;
}

export type UseEventsHook = () => UseEventsHookAPI;

export const defaultFilterRule: FilterRule = {
  name: FilterRuleName.Default,
  cb: () => true,
};
export const defaultSortRule: SortRule = {
  name: SortRuleName.Default,
  cb: (t1, t2) => {
    const t1lastCreatedOrModified = t1.dateModified || t1.dateCreated;
    const t2lastCreatedOrModified = t2.dateModified || t2.dateCreated;

    return Moment(t1lastCreatedOrModified).isAfter(t2lastCreatedOrModified)
      ? -1
      : Moment(t1lastCreatedOrModified).isBefore(t2lastCreatedOrModified)
      ? 1
      : 0;
  },
};

export const useEvents: UseEventsHook = () => {
  const [events, setEvents] = React.useState<PaperChainEvent[]>([]);
  const [filterRule, setFilterRule] = React.useState(defaultFilterRule);
  const [sortRule, setSortRule] = React.useState(defaultSortRule);

  const create = (event: Exclude<PaperChainEvent, "id" | "createdOn">) => {
    setEvents([
      ...events,
      { id: generateUuid(), dateCreated: new Date(), ...event },
    ]);
  };

  const remove = (eventId: string) => {
    setEvents(events.filter((ev) => ev.id !== eventId));
  };

  const getEventById = (id: string): PaperChainEvent | null =>
    events.find((e) => e.id === id) || null;

  const edit = (id: string, event: PaperChainEvent) => {
    setEvents(
      events.map((e) =>
        e.id === id
          ? {
              ...event,
              id,
              dateModified: new Date(),
              elapsed:
                event.type === PaperChainEventType.Until &&
                isElapsed(e.timestamp as Date),
            }
          : e
      )
    );
  };

  const filter = (rule: FilterRule): void => setFilterRule(rule);

  const sort = (rule: SortRule): void => setSortRule(rule);

  return {
    events,
    setEvents,
    create,
    remove,
    filter,
    sort,
    getEventById,
    edit,
    filterRule,
    sortRule,
  };
};

type UseEventsEffects = (eventsHookAPI: UseEventsHookAPI) => void;

export const useEventsEffects: UseEventsEffects = (eventsAPI) => {
  React.useEffect(() => {
    const storedEvents = localStorage.getItem(PaperChainEventsStorageKey);
    if (storedEvents === null)
      localStorage.setItem(
        PaperChainEventsStorageKey,
        JSON.stringify(eventsAPI.events)
      );
    else {
      const parsed: PaperChainEvent[] = JSON.parse(storedEvents).map(
        (p: Record<string, string>) => {
          const timestamp = new Date(p.timestamp);

          const elapsed =
            p.type === PaperChainEventType.Until && isElapsed(timestamp);

          return {
            ...p,
            elapsed,
            dateCreated: new Date(p.dateCreated),
            timestamp,
          };
        }
      );
      eventsAPI.setEvents(parsed);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem(
      PaperChainEventsStorageKey,
      JSON.stringify(eventsAPI.events)
    );
  }, [eventsAPI.events]);
};

export const EventsProvider: React.FC<
  React.PropsWithChildren<Record<string, unknown>>
> = (props) => {
  const eventsAPI = useEvents();
  useEventsEffects(eventsAPI);
  const value = React.useMemo(() => eventsAPI, [
    eventsAPI.events,
    eventsAPI.filterRule,
    eventsAPI.sortRule,
  ]);

  return (
    <EventsContext.Provider value={value}>
      {props.children}
    </EventsContext.Provider>
  );
};
