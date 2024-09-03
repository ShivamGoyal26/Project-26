"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { DropdownMenu } from "./ui/dropdown-menu";

type UserButtonProps = {
  className?: string;
};

const UserButton = ({ className }: UserButtonProps) => {
  const { user } = useSession();
  return <DropdownMenu></DropdownMenu>;
};

export default UserButton;
