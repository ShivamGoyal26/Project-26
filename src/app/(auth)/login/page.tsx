import { Metadata } from "next";
import Login from "@/app/containers/auth/login";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginRoute() {
  return <Login />;
}
