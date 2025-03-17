import { Request, Response } from "express";
import { clerkClient } from "../index.ts";

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const userData = req.body;

  // //   console.log("User data: ", userData);

  try {
    const user = await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        userType: userData.publicMetadata.userType,
        settings: userData.publicMetadata.settings,
      },
    });

    res.status(200).json({ message: "User updated", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uodating user", error: error });
  }
};
