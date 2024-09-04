import { Metadata } from "next";
import SignUp from "@/app/containers/auth/signup";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpRoute() {
  return <SignUp />;
}
