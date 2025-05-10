"use server";
import type { ActionResponseType } from "@/types/action-response";
import {
  signInSchema,
  signUpSchema,
  type SignInInput,
  type SignUpInput,
} from "@/zod-schemas/auth";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { usersTable } from "@/drizzle/schemas/users";
import { generateSalt, hashPassword } from "@/lib/auth/core/hash-password";
import { createUserSession, deleteUserSession } from "@/lib/auth/core/session";
import { cookies } from "next/headers";

export const signUpAction = async (
  unsafeData: SignUpInput
): Promise<ActionResponseType> => {
  const { success, data } = signUpSchema.safeParse(unsafeData);

  // Check wheather the data is actual schema data or not
  if (!success) return { success: false, error: "Invalid Data" };

  // Check if the email already exists or not
  const existingUser = await db.query.users.findFirst({
    where: eq(usersTable.email, data.email),
  });
  if (existingUser)
    return {
      success: false,
      error: "Account already exists for this email.",
    };

  // Generating salt and hashing the password
  const salt = generateSalt();
  const hashedPassword = await hashPassword(data.password, salt);

  // Creating a new user
  const [user] = await db
    .insert(usersTable)
    .values({
      email: data.email,
      name: data.name,
      password: hashedPassword,
      salt: salt,
    })
    .returning();

  // If the insert query fails
  if (!user) return { success: false, error: "Unable to create account." };

  // Creating a new session
  await createUserSession(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      theme: user.theme,
      role: user.role,
    },
    await cookies()
  );

  // Returning a success response
  return { success: true };
};

export const signInAction = async (
  unsafeData: SignInInput
): Promise<ActionResponseType> => {
  // Check wheather the data is actual schema data or not
  const { success, data } = signInSchema.safeParse(unsafeData);
  if (!success) return { success: false, error: "Invalid data" };

  // Find the user using email
  const user = await db.query.users.findFirst({
    where: eq(usersTable.email, data.email),
  });

  // If the user is not found
  if (!user)
    return {
      success: false,
      error:
        "The email or password you entered is incorrect. Please try again.",
    };

  // Hashing the input password using the saved salt from usersTable
  // then compairing the hash password to the usersTable password
  const validPassword =
    (await hashPassword(data.password, user.salt)) === user.password;

  // If the input password hash is not equals to the user password hash
  // then we will return an error response
  if (!validPassword)
    return {
      success: false,
      error:
        "The email or password you entered is incorrect. Please try again.",
    };

  // Creating a new session
  await createUserSession(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      theme: user.theme,
      role: user.role,
    },
    await cookies()
  );

  // Returning a success response
  return { success: true };
};

export const signOutAction = async (): Promise<ActionResponseType> => {
  return await deleteUserSession(await cookies());
};
