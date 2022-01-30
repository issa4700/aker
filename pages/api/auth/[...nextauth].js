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

  callbacks: {
    redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      // Allows relative callback URLs
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },

    async session({ session, user }) {
      // Check if user isAdmin
      const admins = process.env.ADMINS ? process.env.ADMINS.split(",") : null;
      const isAdmin = admins.includes(user.email);
      if (isAdmin) session.isAdmin = true;

      session.userId = user.id;
      session.mcUUID = user.minecraftUUID;

      return session;
    },
  },
});
