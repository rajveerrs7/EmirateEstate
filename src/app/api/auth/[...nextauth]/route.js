import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      
      credentials: {
        email: {label: "email", type: "text"},
        password: {label: "password", type: "password"}
      },

      async authorize(credentials) {
        await dbConnect();
        
        try {
            if (!credentials.email || !credentials.password) {
              throw new Error("Email and password are required");
            }
    
            const user = await User.findOne({ email: credentials.email });
            if (!user) {
              throw new Error("User not found");
            }
    
            const isMatch = await bcrypt.compare(credentials.password, user.password);
            if (!isMatch) {
              throw new Error("Invalid credentials");
            }
    
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              phone: user.phone,
            };
        } catch (error) {
            throw new Error(error.message);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
