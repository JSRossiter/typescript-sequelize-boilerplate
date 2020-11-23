import { ValueGroup } from '@admin-bro/design-system';
import { ShowPropertyProps } from 'admin-bro';
import React from 'react';

const pad = (n: number): string => (n < 10 ? `0${n.toString()}` : n.toString());

const formatDate = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const formatTime = (date: Date, prec: 's' | 'ms' = 's'): string => {
  let time = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds(),
  )}`;
  if (prec === 'ms') {
    time += `.${pad(date.getMilliseconds())}`;
  }
  return time;
};

const formatDateTime = (date: Date, prec: 's' | 'ms' = 's'): string =>
  `${formatDate(date)} ${formatTime(date, prec)}`;

const DatetimeWithPrecision: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props;

  const rawValue = record?.params[property.name];

  if (typeof rawValue === 'undefined' || rawValue === null) {
    return null;
  }

  if (props.where === 'show') {
    const value = formatDateTime(new Date(rawValue), 'ms');
    return <ValueGroup label={property.label}>{value}</ValueGroup>;
  }
  const value = formatDateTime(new Date(rawValue));
  return <span>{value}</span>;
};

export default DatetimeWithPrecision;
