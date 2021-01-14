import React from "react";
import { PaperChainEvent } from "./entities";
import { generateUuid } from "./util";
import { PaperChainEventsStorageKey } from "./config";

export const EventsContext = React.createContext({} as UseEventsHookAPI);

export type FilterRule = { cb: (e: PaperChainEvent, i?: number) => boolean };

export interface UseEventsHookAPI {
  events: PaperChainEvent[];
  setEvents: React.Dispatch<React.SetStateAction<PaperChainEvent[]>>;
  create: (e: PaperChainEvent) => void;
  remove: (eventId: string) => void;
  getEventById: (id: string) => PaperChainEvent | null;
  edit: (id: string, event: PaperChainEvent) => void;
  filter: (rule: FilterRule) => void;
  filterRule: FilterRule;
}

type UseEventsHook = () => UseEventsHookAPI;
export const useEvents: UseEventsHook = () => {
  const [events, setEvents] = React.useState<PaperChainEvent[]>([]);
  const [filterRule, setFilterRule] = React.useState<FilterRule>({
    cb: () => true,
  });

  const create = (event: Exclude<PaperChainEvent, "id" | "createdOn">) => {
    setEvents([
      { id: generateUuid(), dateCreated: new Date(), ...event },
      ...events,
    ]);
  };

  const remove = (eventId: string) => {
    setEvents(events.filter((ev) => ev.id !== eventId));
  };

  const getEventById = (id: string): PaperChainEvent | null =>
    events.find((e) => e.id === id) || null;

  const edit = (id: string, event: PaperChainEvent) => {
    setEvents(events.map((e) => (e.id === id ? { ...event, id } : e)));
  };

  const filter = (rule: FilterRule): void => {
    setFilterRule(rule);
  };

  return {
    events,
    setEvents,
    create,
    remove,
    filter,
    getEventById,
    edit,
    filterRule,
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
      const parsed = JSON.parse(storedEvents).map(
        (p: Record<string, string>) => ({
          ...p,
          dateCreated: new Date(p.dateCreated),
          timestamp: new Date(p.timestamp),
        })
      );
      eventsAPI.setEvents(parsed as PaperChainEvent[]);
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
  ]);

  return (
    <EventsContext.Provider value={value}>
      {props.children}
    </EventsContext.Provider>
  );
};
