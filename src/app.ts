// import cookieParser from 'cookie-parser';
import express from 'express';
import createError, { HttpError } from 'http-errors';
import morgan from 'morgan';
import sslRedirect from './middleware/sslRedirect';
import adminRouter from './routes/admin';
// import path from 'path';
import logger from './utilities/logger';

const app = express();

app.use(morgan('dev', { stream: logger.writeStream }));

app.use(sslRedirect());

app.use('/admin', (req, res, next) => {
  if (
    (req.headers['x-forwarded-for'] || req.connection.remoteAddress) !==
    process.env.ADMIN_ALLOWED_IP
  ) {
    logger.warn(
      'blocking',
      req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      process.env.ADMIN_ALLOWED_IP,
    );
    next(createError(403));
  } else {
    next();
  }
});
app.use('/admin', adminRouter);

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (
  err: HttpError,
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line
  _next: express.NextFunction,
) {
  logger.error(err);
  res.locals.message = err.message || err.status || 500;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;
