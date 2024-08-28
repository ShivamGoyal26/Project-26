import { Metadata } from "next";
import signUpImage from "@/assets/signup-image.jpg";

// Files
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./components/login-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Login() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold">Login to bugbook</h1>
          </div>
          <div className="space-y-5">
            <LoginForm />
            <Link
              href={"/signup"}
              className="block text-center hover:underline"
            >
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>
        <Image
          src={signUpImage}
          alt="Image"
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
