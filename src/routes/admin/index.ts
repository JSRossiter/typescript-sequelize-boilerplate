import AdminBroExpress from '@admin-bro/express';
import AdminBroSequelize from '@admin-bro/sequelize';
import AdminBro, { AdminBroOptions } from 'admin-bro';
import bcrypt from 'bcrypt';
import connectSession from 'connect-session-sequelize';
import session from 'express-session';
import db from '../../models';
import { branding } from './branding';
import { loggedError } from './models/loggedError';
import { user } from './models/user';

AdminBro.registerAdapter(AdminBroSequelize);

const adminBroOptions: AdminBroOptions = {
  resources: [user, loggedError],
  // dashboard: {
  //   handler: dashboardHandler,
  //   component: AdminBro.bundle('../../../views/admin/Dashboard/index.tsx'),
  // },
  branding,
};

const adminBro = new AdminBro(adminBroOptions);
if (process.env.NODE_ENV !== 'production') {
  adminBro.watch();
}

const authenticationOptions = {
  authenticate: async (email: string, password: string) => {
    const user = await db.User.findOne({ where: { email } });
    if (user) {
      const matched = await bcrypt.compare(password, user.encryptedPassword);
      if (matched) {
        return user;
      }
    }
    return false;
  },
  cookiePassword: process.env.SECRET_KEY,
};

const SequelizeStore = connectSession(session.Store);
const sessionOptions = {
  secret: process.env.SECRET_KEY,
  store: new SequelizeStore({ db: db.sequelize }),
  resave: false,
  saveUninitialized: false,
  proxy: true,
};

const router = AdminBroExpress.buildAuthenticatedRouter(
  adminBro,
  authenticationOptions,
  undefined,
  sessionOptions,
);

export default router;
