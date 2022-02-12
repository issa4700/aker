import { uuidForName } from "minecraft-api";
import { getSession } from "next-auth/react";

export default async function helloAPI(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res
      .status(401)
      .json({ Error: "You need to be logged in to do that!" });
  }

  switch (req.method) {
    // Retrieve list of players
    case "GET":
      const { username } = req.query;

      try {
        const uuid = await uuidForName(username);
        if (uuid) {
          return res.status(200).json({ uuid });
        }
      } catch (error) {
        return res.status(500).send(error);
      }

    default:
      return res.status(400).send();
  }
}
