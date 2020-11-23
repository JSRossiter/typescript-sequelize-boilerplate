import AdminBro from 'admin-bro';
import { Router } from 'express';
import { SessionOptions } from 'express-session';
interface Auth {
  authenticate(email: string, password: string): Promise<unknown>;
  cookiePassword?: string;
  cookieName?: string;
}

declare module '@admin-bro/express' {
  export = {
    buildAuthenticatedRouter(
      admin: AdminBro,
      auth: Auth,
      predefinedRouter?: Router,
      sessionOptions?: SessionOptions,
      formidableOptions?: unknown,
    ): Router;,
  };
}
