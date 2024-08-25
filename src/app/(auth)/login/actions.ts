"use server";

import { verify } from "@node-rs/argon2";
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

    const validPassword = verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

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
    if (isRedirectError(error)) throw error; // this error will be catched by same catch block means this block only
    console.log(error);
    return {
      error: "something went wrong, please try again",
    };
  }
}
