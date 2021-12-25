import bsg from "../../lib/redisBSG";
import { uuidForName } from "minecraft-api";
import { getSession } from "next-auth/react";
import { formatUUID, validateUUID } from "../../lib/uuid";

const key = "whitelist.test"; // Change this when API route is complete
export default async function WhitelistedUsers(req, res) {
  const session = await getSession({ req });

  // Check if user is authenticated
  if (!session) {
    return res
      .status(401)
      .json({ Error: "You need to be logged in to do that!" });
  }

  switch (req.method) {
    // Retrieve list of players
    case "GET":
      //This endpoint is publically available
      const players = await bsg.smembers(key);

      return res.status(200).json(players);

    // Add players to whitelist
    case "POST":
      await addPlayer(req, res);
      break;

    // Remove players from whitelist
    case "DELETE":
      await delPlayer(req, res);
      break;

    default:
      return res.status(400).send();
  }
}

async function addPlayer(req, res) {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).send();

    let uuid = await uuidForName(username);

    uuid = formatUUID(uuid);

    if (!bsg.sadd(key, uuid)) throw "Unable to add player to whitelist!";

    return res.status(200).json({ success: "Player added to whitelist", uuid });
  } catch (e) {
    return res.status(500).json({ Error: e });
  }
}

async function delPlayer(req, res) {
  try {
    const { uuid } = req.body;
    if (!uuid || !validateUUID(uuid)) return res.status(400).send();

    if (!bsg.srem(key, uuid)) throw "Unable to remove player from whitelist!";

    return res
      .status(200)
      .json({ success: "Player(s) removed from whitelist" });
  } catch (e) {
    return res.status(500).json({ Error: e });
  }
}
