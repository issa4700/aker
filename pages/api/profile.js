import bsg from "../../lib/redisBSG";
import { getSession } from "next-auth/react";
import Application from "../../lib/models/application";

const key =
  process.env.NODE_ENV == "development" ? "whitelist.test" : "whitelist.main";

export default async function WhitelistedUsers(req, res) {
  const session = await getSession({ req });

  // Check if user is authenticated
  if (!session) {
    return res
      .status(401)
      .json({ Error: "You need to be logged in to do that!" });
  }

  try {
    switch (req.method) {
      case "GET":
        const { mcUUID: uuid, userId } = session;

        // See if user exists on whitelist
        const isWhitelisted = await bsg.sismember(key, uuid);

        // Get list of applications by user
        const application = await Application.sync().then(() => {
          return Application.findOne({
            where: { userId: userId },
          });
        });

        return res.status(200).json({ isWhitelisted, application });
      default:
        return res.status(400).send();
    }
  } catch (e) {
    return res.status(500).send({ Error: "Something went wrong!", e });
  }
}
