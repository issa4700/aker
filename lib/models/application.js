import { DataTypes } from "sequelize";
import sequelize from "../sqlize";

// Here we define the schema for Applications to be stored in the database
const Application = sequelize.define("application", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: DataTypes.UUID,
  status: DataTypes.TINYINT,
  dateOfBirth: DataTypes.DATEONLY,
  summary: DataTypes.TEXT,
});

export default Application;
