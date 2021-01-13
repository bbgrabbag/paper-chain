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
  Months = "weeks",
  Weeks = "months",
  Days = "days",
}

export const formatTimestamp = (
  type: PaperChainEventType,
  name: string,
  date: Date
): TimestampMetrics => {
  const d = new Date();
  const today = Moment(d.getTime() + d.getTimezoneOffset() / 60);
  const timestamp = Moment(date.getTime() + date.getTimezoneOffset() / 60);

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

  const dif =
    type === PaperChainEventType.Since
      ? today.diff(timestamp)
      : timestamp.diff(today) + 1000 * 60 * 60 * 24;
  metrics.forEach((metric) => {
    output[metric] = Moment.duration(dif).get(metric);
  });

  return output;
};

export interface FormattedTimestampMetrics {
  metrics: string;
  eventName: string;
  type: string;
}

export const formatTimestampMetrics = (
  metrics: TimestampMetrics,
  type: PaperChainEventType,
  name: string,
  abbr?: boolean
): FormattedTimestampMetrics => {
  const data = (Object.keys(metrics) as TimestampFormats[]).reduce(
    (s, k, i, a) => {
      const value = metrics[k];
      const measurement = abbr
        ? k[0]
        : " " + (metrics[k] > 1 ? k : k.slice(0, k.indexOf("s")));
      const separator = i === a.length - 1 ? "" : ",";
      const fragment = value ? `${value}${measurement}${separator}` : "";
      return `${s} ${fragment}`;
    },
    ""
  );
  
  return {
    metrics: data.trim() === '' ? '< 1 day' : data,
    eventName: name,
    type: type.toLowerCase(),
  };
};

