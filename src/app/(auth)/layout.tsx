import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Auth Layout file runing");

  const { user } = await validateRequest();

  if (user) redirect("/");

  return <>{children}</>;
}