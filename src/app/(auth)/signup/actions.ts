"use server";

import { hash } from "bcryptjs";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import prisma from "@/lib/prisma";
import { lucia } from "@/auth";
import { cookies } from "next/headers";

// Files
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function signUp(
  credentials: SignUpValues,
): Promise<{ error: string }> {
  try {
    const parseResult = signUpSchema.safeParse(credentials);

    if (!parseResult.success) {
      return {
        error: parseResult.error.errors.map((e) => e.message).join(", "),
      };
    }

    const { username, email, password } = parseResult.data;

    const hashedPassword = await hash(password, 10); // 10 is the salt rounds

    const userId = generateIdFromEntropySize(10);

    const existingUsername = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (existingUsername) {
      return {
        error: "Username already taken",
      };
    }

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (existingEmail) {
      return {
        error: "Email already taken",
      };
    }

    await prisma.user.create({
      data: {
        id: userId,
        username,
        email,
        displayName: username,
        passwordHash: hashedPassword,
      },
    });

    const session = await lucia.createSession(userId, {});
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
