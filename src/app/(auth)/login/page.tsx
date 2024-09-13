import Login from "@/containers/auth/login";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Login",
};

export default function LoginRoute() {
  return <Login />;
}
