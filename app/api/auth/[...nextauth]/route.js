// export { GET, POST } from "@/auth";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { fetchAdmin } from "@/lib/data";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials === null) return null;
        try {
          const admin = await fetchAdmin(credentials?.username);
          if (admin) {
            // const isMatch = admin?.password === credentials?.password;
            const isMatch = await bcrypt.compare(credentials.password, admin.password);

            if (isMatch) {
              return { id: admin._id, name: admin.username };
            } else {
              throw new Error("Wrong Credentials");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (err) {
          throw new Error(err.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  debug: true,
});
