import bcrypt from "bcryptjs";
import credentials from "next-auth/providers/credentials";
import { userModel } from "./models/user-model";
import { replaceMongoIdInObject } from "./utils/data-utils.js";
import connectMongo from "./services/mongo.js";

const authConfig = {
  providers: [
    credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        await connectMongo();
        try {
          const user = await userModel
            .findOne({ email: credentials.email })
            .lean();
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isMatch) {
              return replaceMongoIdInObject(user);
            } else {
              throw new Error("Email or password mismatch");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Authorization failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, profile, trigger, session }) {
      // console.log("token1", token);
      // console.log("account", account);
      // console.log("user", user);
      // console.log("profile", profile);
      // console.log("trigger", trigger);
      // console.log("session", session);
      if (user) {
        return {
          ...token,
          user: {
            name: user.name,
            email: user.email,
            image: user.image,
            id: user.id,
            role: user.role,
            emailVerified: user.emailVerified,
            code: user.code,
          },
        };
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("token2", token);
      session.user = token.user;
      session.error = token.error;
      // console.log("session", session);
      return session;
    },
  },
};

export default authConfig;
