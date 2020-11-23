interface UserAttributes {
  id: number;
  encryptedPassword: string;
  email: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
}

type UserCreationAttributes = import('sequelize/types').Optional<
  UserAttributes,
  'id'
>;
