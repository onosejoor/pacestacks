"use server";

import { cookies } from "next/headers";

export async function getSession() {
  const cookie = await cookies();

  const session = cookie.get("pacestacks_rtoken")?.value;

  if (!session) {
    return { isAuth: false, message: "Unauthenticated" };
  }

  return {
    isAuth: true,
    message: "Authenticated",
  };
}
