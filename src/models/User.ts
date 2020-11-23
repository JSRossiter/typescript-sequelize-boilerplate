'use strict';
import { DataTypes as DataTypesType, Model, Sequelize } from 'sequelize';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const factory = (sequelize: Sequelize, DataTypes: typeof DataTypesType) => {
  class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public readonly id!: number;
    public encryptedPassword: string;
    public email: string;
    public role: 'ADMIN' | 'SUPER_ADMIN';

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // static associate(models: DB) {
    //   // define association here
    // }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      encryptedPassword: DataTypes.STRING,
      role: DataTypes.ENUM('ADMIN', 'SUPER_ADMIN'),
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};

export type UserStatic = ReturnType<typeof factory>;
export type UserModel = InstanceType<UserStatic>;
export default factory;
