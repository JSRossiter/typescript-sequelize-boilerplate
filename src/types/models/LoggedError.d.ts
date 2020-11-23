type ErrorSeverity = 'critical' | 'error' | 'warning' | 'info';

interface LoggedErrorAttributes {
  id: number;
  key: string;
  message: string;
  stack: string;
  severity: ErrorSeverity;
  dedupKey: string;
  createdAt: Date;
  updatedAt: Date;
}

type LoggedErrorCreationAttributes = import('sequelize/types').Optional<
  LoggedErrorAttributes,
  'message',
  'stack',
  'severity',
  'dedupKey'
>;
