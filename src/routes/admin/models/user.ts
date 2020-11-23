import { ResourceWithOptions } from 'admin-bro';
import {
  ActionRequest,
  Before,
  IsFunction,
} from 'admin-bro/types/src/backend/actions/action.interface';
import bcrypt from 'bcrypt';
import models from '../../../models';
const { User } = models;

interface UserNewRequest extends ActionRequest {
  payload: { password: string; encryptedPassword?: string };
}

const isAccessible: IsFunction = ({ currentAdmin, record }) =>
  currentAdmin &&
  (currentAdmin.role === 'SUPER_ADMIN' || currentAdmin.id === record.params.id);

const beforeUpdate: Before = async (
  request: UserNewRequest,
): Promise<UserNewRequest> => {
  if (request.payload.password) {
    request.payload = {
      ...request.payload,
      encryptedPassword: await bcrypt.hash(request.payload.password, 10),
      password: undefined,
    };
  }
  return request;
};

export const user: ResourceWithOptions = {
  resource: User,
  options: {
    properties: {
      encryptedPassword: {
        isVisible: false,
      },
      password: {
        type: 'string',
        isVisible: {
          list: false,
          edit: true,
          filter: false,
          show: false,
        },
      },
    },
    actions: {
      edit: { isAccessible, before: beforeUpdate },
      show: { isAccessible },
      delete: { isAccessible },
      new: { before: beforeUpdate },
    },
    navigation: { name: 'Admin', icon: 'UserAdmin' },
  },
};
