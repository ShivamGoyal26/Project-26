import SignUp from "@/containers/auth/signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpRoute() {
  return <SignUp />;
}
