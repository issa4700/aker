import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter";
import sequelize from "../../../lib/sqlize";
import Application from "../../../lib/models/application";
import { DataTypes } from "sequelize";

sequelize.sync();

export default NextAuth({
  secret: `${process.env.JWT_SECRET}`,

  adapter: SequelizeAdapter(sequelize, {
    models: {
      User: sequelize.define("user", {
        ...models.User,
        minecraftUUID: DataTypes.UUID,
      }),

      Application: Application,
    },
  }),

  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
});
