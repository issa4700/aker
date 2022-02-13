import { models } from "@next-auth/sequelize-adapter";
import { DataTypes } from "sequelize";
import sequelize from "../sqlize";

// Here we define the schema for Applications to be stored in the database
const User = sequelize.define("user", {
  ...models.User,
  minecraftUUID: { type: DataTypes.UUID, unique: true },
});

export default User;
