import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
  id: string;
  name: string;
}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
      
        if (credentials) {
          const user: User = { id: credentials.username, name: credentials.username }; // Create a user object
          return user; 
        }
        return null; 
      },
    }),
  ],
  pages: {
    signIn: '/mainPage', // 
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };