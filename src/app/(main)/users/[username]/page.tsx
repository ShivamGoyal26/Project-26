import React, { cache } from "react";
import UserProfile, { getUser } from "../../../../containers/main/profile";
import prisma from "../../../../lib/prisma";
import { validateRequest } from "@/auth";
import { Metadata } from "next";

interface PageProps {
  params: { username: string };
}

export async function generateMetadata({
  params: { username },
}: PageProps): Promise<Metadata> {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return {};

  const user = await getUser(username, loggedInUser.id);

  return {
    title: `${user.displayName} (@${user.username})`,
  };
}

export default async function Page({ params: { username } }: PageProps) {
  return <UserProfile username={username} />;
}
