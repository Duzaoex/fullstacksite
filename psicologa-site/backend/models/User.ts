import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
}

User.init({
  username: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'User',
});

export default User;