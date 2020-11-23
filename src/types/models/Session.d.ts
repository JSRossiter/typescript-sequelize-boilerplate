interface SessionAttributes {
  sid: string;
  userId: string;
  expires: Date;
  data: string;
}

type SessionCreationAttributes = import('sequelize/types').Optional<
  SessionAttributes
>;
