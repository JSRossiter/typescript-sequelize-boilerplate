import { ResourceWithOptions } from 'admin-bro';
import models from '../../../models';
import { formattedDatetime } from '../helpers/formatComponent';
const { LoggedError } = models;

export const loggedError: ResourceWithOptions = {
  resource: LoggedError,
  options: {
    listProperties: ['createdAt', 'key', 'severity', 'message'],
    sort: { direction: 'desc', sortBy: 'createdAt' },
    navigation: { name: 'Admin', icon: 'UserAdmin' },
    properties: {
      createdAt: formattedDatetime,
      updatedAt: formattedDatetime,
    },
  },
};
