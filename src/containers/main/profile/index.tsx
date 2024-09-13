import { cache } from "react";
import { getUserDataSelect } from "@/lib/types";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

type UserProfile = {
  username: string;
};

export const getUser = cache(
  async (username: string, loggedInUserId: string) => {
    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
      select: getUserDataSelect(loggedInUserId),
    });

    if (!user) notFound();

    return user;
  },
);

const UserProfile = ({ username }: UserProfile) => {
  return <div>{username}</div>;
};

export default UserProfile;
