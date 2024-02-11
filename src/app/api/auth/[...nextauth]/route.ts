import { NextApiHandler } from "next";
import NextAuth, { SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
  throw new Error(
    "Environment variables GOOGLE_ID and GOOGLE_SECRET must be set"
  );
}

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt" as SessionStrategy,
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

// Named exports for each HTTP method
export const GET = authHandler;
export const POST = authHandler;
export const PUT = authHandler;
export const DELETE = authHandler;