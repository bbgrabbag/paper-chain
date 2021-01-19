import React from 'react';
import { PaperChainEventType } from "./entities";
import Moment from "moment";

export const generateUuid = (): string => {
  return crypto.getRandomValues(new Int32Array(10))[0].toString(12);
};

export interface TimestampMetrics {
  years: number;
  months: number;
  weeks: number;
  days: number;
}

export enum TimestampFormats {
  Years = "years",
  Months = "months",
  Weeks = "weeks",
  Days = "days",
}

export const formatTimestamp = (
  type: PaperChainEventType,
  date: Date,
  daysOnly = false
): TimestampMetrics => {
  const d = new Date();
  const today = Moment(d.getTime() + d.getTimezoneOffset() / 60);
  const timestamp = Moment(date.getTime() + date.getTimezoneOffset() / 60);
  if (type === PaperChainEventType.Until) timestamp.add(1000 * 60 * 60 * 24);

  const metrics: TimestampFormats[] = [
    TimestampFormats.Years,
    TimestampFormats.Months,
    TimestampFormats.Weeks,
    TimestampFormats.Days,
  ];

  const output: TimestampMetrics = {
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
  };

  if (daysOnly)
    return {
      ...output,
      days: Math.abs(today.diff(timestamp, "days")),
    };

  metrics.forEach((metric) => {
    const before = type === PaperChainEventType.Since ? timestamp : today;
    const after = before === today ? timestamp : today;
    const dif = after.diff(before, metric);
    output[metric] = Math.abs(dif);
    before.add(dif, metric);
  });

  return output;
};

export interface FormattedTimestampMetrics {
  metrics: string[];
  eventName: string;
  type: string;
  days?: number;
}

export const formatTimestampMetrics = (
  metrics: TimestampMetrics,
  type: PaperChainEventType,
  name: string,
  abbr?: boolean
): FormattedTimestampMetrics => {
  const data = (Object.keys(metrics) as TimestampFormats[]).reduce<string[]>(
    (s, k) => {
      const value = metrics[k];
      const measurement = abbr
        ? k[0]
        : metrics[k] > 1
        ? k
        : k.slice(0, k.indexOf("s"));
      const fragment = value
        ? `${value}${abbr ? "" : " "}${measurement}`
        : null;
      return fragment == null ? s : [...s, fragment];
    },
    []
  );

  return {
    metrics: data.length ? data : ["< 1 day"],
    eventName: name,
    type: type.toLowerCase(),
  };
};

export const isElapsed = (timestamp: Date): boolean => {
  return Moment(timestamp).isSameOrBefore(new Date());
};

export const capitalize = (s = ""): string =>
  s[0].toUpperCase() + s.slice(1).toLowerCase();

export const useScrollIntoView = <D>(deps: D[] = []): void => {
  React.useEffect(() => {
    document.body.scrollIntoView();
  }, [...deps]);
};
