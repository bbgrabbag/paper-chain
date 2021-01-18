import React from "react";
import {
  SearchFilterRule,
  EventsContext,
  FilterRuleName,
  UseEventsHookAPI,
} from "./EventsProvider";
import { DefaultFormatterKeys, TextField, Form } from "./lib";
import { useForm } from "./config";
import { FilterByCategory, FilterByOccurence, SearchEntity } from "./entities";
import { Badge, Box, Close, Flex, Text } from "theme-ui";
import { capitalize } from "./util";
import Moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export const useFilterOnSearch = (
  keyword: string | null,
  eventsAPI: UseEventsHookAPI
): void => {
  React.useEffect(() => {
    if (keyword == null) {
      if (eventsAPI.isFilterActive(FilterRuleName.Search))
        eventsAPI.removeFilters([FilterRuleName.Search]);
    } else {
      eventsAPI.addFilters<SearchFilterRule>([
        {
          name: FilterRuleName.Search,
          // cb: (e) => !!e.name?.toLowerCase().includes(keyword.toLowerCase()),
          keyword,
        },
      ]);
    }
  }, [keyword]);
};

export const EventSearchForm: React.FC = () => {
  const eventsAPI = React.useContext(EventsContext);
  const formControls = useForm<SearchEntity>(
    {
      keyword: {
        type: DefaultFormatterKeys.Text,
        validators: [],
      },
    },
    { keyword: null }
  );

  useFilterOnSearch(formControls.fieldControls.keyword.rawValue, eventsAPI);

  const handleClear = () => formControls.updateField("keyword", "");

  const showClearButton = formControls.fieldControls.keyword.rawValue !== null;

  const renderFilterResultsText = () => {
    const handleBadgeClick = (name: FilterRuleName) => () => {
      eventsAPI.removeFilters([name]);
      if (name === FilterRuleName.Search) handleClear();
    };

    const badges = eventsAPI.filterRules
      .filter((r) => {
        if (r.name === FilterRuleName.Occurrence)
          return r.occurrence !== FilterByOccurence.Whenever;
        if (r.name === FilterRuleName.Category)
          return r.category !== FilterByCategory.All;
        return true;
      })
      .map((r, i) => {
        let text = "";
        if ("keyword" in r) text = `Keyword: ${r.keyword}`;

        if ("occurrence" in r)
          text = ` Occurs ${r.occurrence.toLowerCase()} ${Moment(r.date).format(
            "M/D/YY"
          )}`;
        if ("category" in r) text = `Category: ${capitalize(r.category)}`;
        return (
          <Badge
            variant="badgeButton"
            sx={{ margin: "3px" }}
            key={i}
            onClick={handleBadgeClick(r.name)}
          >
            <FontAwesomeIcon icon={faTimesCircle} /> {text}
          </Badge>
        );
      });

    const filterSearchInfoText = eventsAPI.filterRules.length ? (
      <Text as='span'>
        Showing <b>{eventsAPI.events.length}</b> result(s) for: {badges}
      </Text>
    ) : eventsAPI.meta.count > 0 ? (
      <Text as='span' sx={{ width: '100%'}}>Showing all result(s): <b>{eventsAPI.meta.count}</b> total</Text>
    ) : null;

    return (
      <Flex sx={{ flexDirection: "column", width:'100%' }}>
        <Box sx={{textAlign:'right', fontSize:1}}>
            {filterSearchInfoText}
        </Box>
      </Flex>
    );
  };

  return (
    <Form
      id="event-search-form"
      onSubmit={(e) => e.preventDefault()}
      sx={{ flexDirection: "column" }}
    >
      <Flex sx={{ width: "100%" }}>
        <Box sx={{ flex: "auto" }}>
          <TextField
            label={""}
            fieldName={"keyword"}
            formControls={formControls}
            inputAttrs={{ placeholder: "Search Paper Chains" }}
          />
        </Box>
        <Flex sx={{ justifyContent: "center", alignItems: "center" }}>
          {showClearButton && (
            <Close
              sx={{ color: "text" }}
              variant="iconSm"
              type="button"
              onClick={handleClear}
            ></Close>
          )}
        </Flex>
      </Flex>
      <Flex id="filter-sort-search-info">{renderFilterResultsText()}</Flex>
    </Form>
  );
};
