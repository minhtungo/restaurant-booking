import { JWTPayload, jwtVerify } from "jose";

interface UserJwtPayload {
  jti: string;
  iat: number;
}

export function getJwtSecretKey(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error("JWT_SECRET is not set");
  }

  return secret;
}

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload as UserJwtPayload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
