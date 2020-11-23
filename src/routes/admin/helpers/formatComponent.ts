import AdminBro from 'admin-bro';

const formatComponent = AdminBro.bundle(
  '../../../../views/admin/FormattedPropertyValue.tsx',
);
export const formattedNumber = {
  components: { list: formatComponent },
  custom: { precision: 8 },
};

const datetimeComponent = AdminBro.bundle(
  '../../../../views/admin/components/DatetimeWithPrecision.tsx',
);
export const formattedDatetime = {
  components: { show: datetimeComponent, list: datetimeComponent },
};
