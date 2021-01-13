import React from "react";
import { EventGridDetail } from "./EventGridDetail";
import { EventDetailAdd } from "./EventDetailAdd";
import { EventsContext } from "./EventsProvider";
import { EventSearchForm } from "./EventSearchForm";

export const EventGrid: React.FC = () => {
  const eventsAPI = React.useContext(EventsContext);

  const renderEventList = (): React.ReactElement[] => {
    return eventsAPI.events.filter(eventsAPI.filterRule.cb).map((e) => (
      <li key={e.id}>
        <EventGridDetail event={e} />
      </li>
    ));
  };

  return (
    <div>
      <header>
        <EventSearchForm />
        {/* <button>Sort</button>
        <button>Filter</button> */}
      </header>
      <section>
        <ul>
         {renderEventList()}
        </ul>
      </section>
      <footer>
        <EventDetailAdd />
      </footer>
    </div>
  );
};
