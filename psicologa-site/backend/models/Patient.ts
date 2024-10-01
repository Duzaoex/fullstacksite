import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Patient extends Model {
  public id!: number;
  public name!: string;
  public birthDate!: Date;
  public notes!: string;
}

Patient.init({
  name: DataTypes.STRING,
  birthDate: DataTypes.DATE,
  notes: DataTypes.TEXT,
}, {
  sequelize,
  modelName: 'Patient',
});

export default Patient;