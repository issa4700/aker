import { DataTypes } from "sequelize";
import User from "../models/user";
import sequelize from "../sqlize";

// Here we define the schema for Applications to be stored in the database
const Application = sequelize.define("application", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: "id",
    },
  },
  status: DataTypes.TINYINT,
  dateOfBirth: DataTypes.DATEONLY,
  summary: DataTypes.TEXT,
});

Application.belongsTo(User, { onDelete: "CASCADE", onUpdate: "CASCADE" });

export default Application;
