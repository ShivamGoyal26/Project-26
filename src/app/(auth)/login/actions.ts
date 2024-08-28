"use server";

import { compare } from "bcryptjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isRedirectError } from "next/dist/client/components/redirect";

// Files
import { loginSchema, LoginValues } from "@/lib/validation";
import prisma from "@/lib/prisma";
import { lucia } from "@/auth";

export async function login(
  credentials: LoginValues,
): Promise<{ error: string }> {
  try {
    const parseResult = loginSchema.safeParse(credentials);

    if (!parseResult.success) {
      return {
        error: parseResult.error.errors.map((e) => e.message).join(", "),
      };
    }

    const { username, password } = parseResult.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (!existingUser || !existingUser.passwordHash) {
      return {
        error: "Incorrect username or password",
      };
    }

    const validPassword = await compare(password, existingUser.passwordHash);

    if (!validPassword) {
      return {
        error: "Incorrect username or password",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);
    return {
      error: "something went wrong, please try again",
    };
  }
}
