import React from "react";
import {
  FilterByCategory,
  FilterByOccurence,
  PaperChainEvent,
  PaperChainEventType,
} from "./entities";
import { generateUuid, isElapsed } from "./util";
import {
  defaultSortRule,
  FilterRule,
  filterRuleCallbacks,
  FilterRuleName,
  PaperChainEventsStorageKey,
  PaperChainFilterStorageKey,
  PaperChainSortStorageKey,
  SortRule,
  sortRuleCallbacks,
} from "./config";

export const EventsContext = React.createContext({} as UseEventsHookAPI);

export interface UseEventsHookAPI {
  __events: PaperChainEvent[];
  events: PaperChainEvent[];
  setEvents: React.Dispatch<React.SetStateAction<PaperChainEvent[]>>;
  create: (e: PaperChainEvent) => void;
  remove: (eventId: string) => void;
  getEventById: (id: string) => PaperChainEvent | null;
  edit: (id: string, event: PaperChainEvent) => void;
  addFilters: <F extends FilterRule>(rules: F[]) => void;
  removeFilters: (ruleNames: FilterRuleName[]) => void;
  setFilterRules: React.Dispatch<React.SetStateAction<FilterRule[]>>;
  isFilterActive: (ruleName: FilterRuleName) => boolean;
  sort: (rule: SortRule) => void;
  setSortRule: React.Dispatch<React.SetStateAction<SortRule>>;
  filterRules: FilterRule[];
  sortRule: SortRule;
  meta: {
    count: number;
  };
}

export type UseEventsHook = () => UseEventsHookAPI;

export const useEvents: UseEventsHook = (): UseEventsHookAPI => {
  const [events, setEvents] = React.useState<PaperChainEvent[]>([]);
  const [filterRules, setFilterRules] = React.useState<FilterRule[]>([]);
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

  const addFilters = <F extends FilterRule>(rules: F[]): void => {
    const map = filterRules
      .concat(rules)
      .reduce<Record<FilterRuleName, FilterRule>>(
        (m, f) => ({
          ...m,
          [f.name]: f,
        }),
        {} as Record<FilterRuleName, FilterRule>
      );

    setFilterRules(
      (Object.keys(map) as Array<FilterRuleName>)
        .filter((k) => {
          const filterRule = map[k];
          if ("category" in filterRule) {
            return filterRule.category !== FilterByCategory.All;
          } else if ("occurrence" in filterRule) {
            return filterRule.occurrence !== FilterByOccurence.Whenever;
          }
          return true;
        })
        .map((k) => map[k])
    );
  };

  const removeFilters = (ruleNames: FilterRuleName[]): void => {
    setFilterRules(filterRules.filter((f) => !ruleNames.includes(f.name)));
  };

  const isFilterActive = (ruleName: FilterRuleName): boolean =>
    !!filterRules.find((f) => f.name === ruleName);

  const sort = (rule: SortRule): void => setSortRule(rule);

  return {
    __events: events,
    events: events
      .filter((e) =>
        filterRules.every((f) => {
          if ("category" in f)
            return filterRuleCallbacks[f.name](e, f.category);
          if ("occurrence" in f)
            return filterRuleCallbacks[f.name](e, f.occurrence, f.date);
          else return filterRuleCallbacks[f.name](e, f.keyword);
        })
      )
      .sort(sortRuleCallbacks[sortRule.name]),
    setEvents,
    create,
    remove,
    addFilters,
    removeFilters,
    setFilterRules,
    isFilterActive,
    sort,
    setSortRule,
    getEventById,
    edit,
    filterRules,
    sortRule,
    meta: {
      count: events.length,
    },
  };
};

export type UseEventsEffects = (eventsHookAPI: UseEventsHookAPI) => void;

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

    const storedFilterRules = localStorage.getItem(PaperChainFilterStorageKey);
    if (storedFilterRules == null)
      localStorage.setItem(
        PaperChainFilterStorageKey,
        JSON.stringify(eventsAPI.filterRules)
      );
    else {
      const parsed = JSON.parse(storedFilterRules) as FilterRule[];
      eventsAPI.setFilterRules(
        parsed
          .filter((f) => f.name !== FilterRuleName.Search)
          .map((f) =>
            "date" in f ? { ...f, date: f.date ? new Date(f.date) : null } : f
          )
      );
    }

    const storedSortRule = localStorage.getItem(PaperChainSortStorageKey);
    if (storedSortRule == null)
      localStorage.setItem(
        PaperChainSortStorageKey,
        JSON.stringify(eventsAPI.sortRule)
      );
    else {
      const parsed = JSON.parse(storedSortRule) as SortRule;
      eventsAPI.setSortRule(parsed);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem(
      PaperChainEventsStorageKey,
      JSON.stringify(eventsAPI.__events)
    );
    localStorage.setItem(
      PaperChainFilterStorageKey,
      JSON.stringify(
        eventsAPI.filterRules.filter((f) => f.name !== FilterRuleName.Search)
      )
    );
    localStorage.setItem(
      PaperChainSortStorageKey,
      JSON.stringify(eventsAPI.sortRule)
    );
  }, [eventsAPI.__events, eventsAPI.filterRules, eventsAPI.sortRule]);
};

export const EventsProvider: React.FC<
  React.PropsWithChildren<Record<string, unknown>>
> = (props) => {
  const eventsAPI = useEvents();
  useEventsEffects(eventsAPI);
  const value = React.useMemo(() => eventsAPI, [
    eventsAPI.__events,
    eventsAPI.filterRules,
    eventsAPI.sortRule,
  ]);

  return (
    <EventsContext.Provider value={value}>
      {props.children}
    </EventsContext.Provider>
  );
};
