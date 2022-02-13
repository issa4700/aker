import { getSession } from "next-auth/react";
import User from "../../lib/models/user";

export default async function LinkAccAPI(req, res) {
  if (req.method !== "POST") return res.status(400).send();

  // Check for user session
  const session = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ Error: "You need to be logged in to do that!" });
  }

  // Attempt linking Minecraft account to user account
  try {
    const { uuid } = req.body;

    // Check if UUID is already linked by someone else
    const count = await User.count({
      where: { minecraftUUID: uuid },
    });
    if (count.length > 0)
      throw "That account is already linked by another player!";

    // Check if user already has a linked account
    const player = await User.findOne({
      attributes: ["id", "minecraftUUID"],
      where: { id: session.userId },
    });

    if (player.minecraftUUID !== null)
      throw "A Minecraft account is already linked with this profile!";

    // If not, update the user
    const update = await player.update({ minecraftUUID: uuid });
    if (!update) throw "Unable to link accounts";

    return res.status(200).json({ player });
  } catch (error) {
    return res.status(500).send(error);
  }
}
