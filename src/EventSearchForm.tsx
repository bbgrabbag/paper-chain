import React from "react";
import { EventsContext, UseEventsHookAPI } from "./EventsProvider";
import { DefaultFormatterKeys, TextField, Form } from "./lib";
import {
  FilterRuleName,
  SearchFilterRule,
  SortRuleName,
  useForm,
} from "./config";
import { SearchEntity } from "./entities";
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

    const badges = eventsAPI.filterRules.map((r, i) => {
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
      <Text as="span">
        Showing <b>{eventsAPI.events.length}</b> result(s) for:
        <Text>{badges}</Text>
      </Text>
    ) : eventsAPI.meta.count > 0 ? (
      <Text as="span" sx={{ width: "100%" }}>
        Showing all results: <b>{eventsAPI.meta.count}</b> total
      </Text>
    ) : null;

    const sortNameKeys = {
      [SortRuleName.Default]: "Updated recently",
      [SortRuleName.OldToNew]: "Updated later",
      [SortRuleName.AtoZ]: "A to Z",
      [SortRuleName.ZtoA]: "Z to A",
      [SortRuleName.FutureToPast]: "Occurs later",
      [SortRuleName.PastToFuture]: "Occurs earlier",
    };
    const sortInfoText = `${sortNameKeys[eventsAPI.sortRule.name]}`;
    return (
      <Flex sx={{ flexDirection: "column", width: "100%" }}>
        <Box sx={{ textAlign: "right", fontSize: 1 }}>
          {filterSearchInfoText}
        </Box>
        <Box sx={{ textAlign: "right", fontSize: 1 }}>
          {!!eventsAPI.meta.count && (
            <Text>
              Sorted by: <b>{sortInfoText}</b>
            </Text>
          )}
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
            inputAttrs={{
              placeholder: "Search Paper Chains",
              disabled: !eventsAPI.meta.count,
            }}
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
