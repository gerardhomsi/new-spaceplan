// import bcrypt from "bcrypt";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// import { fetchAdmin } from "@/lib/data";

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         if (credentials === null) return null;
//         try {
//           const admin = await fetchAdmin(credentials?.username);
//           if (admin) {
//             const isMatch = await bcrypt.compare(credentials.password, admin.password);

//             if (isMatch) return { id: admin._id, name: admin.username };
//             else throw new Error("Wrong Credentials");
//           } else throw new Error("User not found");
//         } catch (err) {
//           throw new Error(err.message);
//         }
//       },
//     }),
//   ],
//   pages: { signIn: "/login" },
//   debug: true,
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async session({ session, token }) {
//       const { id, username, roles } = token || {};
//       // Access user data from authorize function return value (if present)
//       session.user = { id, username, roles }; // Replace with specific user data if needed
//       return session;
//     },
//   },
// });

import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Admin from "./lib/models/admin";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        try {
          const admin = await Admin.findOne({ username: credentials.username });
          if (!admin) {
            throw new Error("Invalid username or password");
          }

          const isMatch = await bcrypt.compare(credentials.password, admin.password);
          if (!isMatch) {
            throw new Error("Invalid username or password");
          }

          return { id: admin._id.toString(), name: admin.username, roles: admin.roles }; // Assuming roles is a field
        } catch (err) {
          console.error("Authorization error:", err);
          throw new Error("Login failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          roles: token.roles,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.roles = user.roles;
      }
      return token;
    },
  },
});
