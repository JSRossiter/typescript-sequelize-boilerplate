import { ShowPropertyProps } from 'admin-bro';
import React from 'react';
import { round } from '../../../src/utilities/round';

const FormattedPropertyValue: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props;

  const rawValue = record?.params[property.name];

  if (typeof rawValue === 'undefined' || rawValue === null) {
    return null;
  }

  if (property.custom.precision) {
    return round(Number(rawValue), property.custom.precision);
  }

  return rawValue;
};

export default FormattedPropertyValue;
