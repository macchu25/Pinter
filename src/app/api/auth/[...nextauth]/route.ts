import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log("NextAuth initializing...");
console.log("GOOGLE_CLIENT_ID exists:", !!process.env.GOOGLE_CLIENT_ID);
console.log("NEXTAUTH_SECRET exists:", !!process.env.NEXTAUTH_SECRET);

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user, account }: any) {
            console.log("JWT callback triggered", { hasUser: !!user, hasAccount: !!account });
            if (account && user) {
                try {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
                    console.log(`Syncing social login with: ${apiUrl}`);
                    
                    const response = await fetch(`${apiUrl}/auth/social-login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: user.email,
                            name: user.name,
                        }),
                    });

                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error(`Backend sync failed: ${response.status} ${errorText}`);
                        return token;
                    }

                    const data = await response.json();
                    if (data.token) {
                        console.log("AccessToken received from backend");
                        token.accessToken = data.token;
                    } else {
                        console.warn("No token property in backend response");
                    }
                } catch (error) {
                    console.error("Backend sync failed during fetch:", error);
                }
            }
            return token;
        },
        async session({ session, token }: any) {
            console.log("Session callback triggered", { hasToken: !!token, hasAccessToken: !!token?.accessToken });
            if (token?.accessToken) {
                session.accessToken = token.accessToken;
            }
            return session;
        },
    },
});

export { handler as GET, handler as POST };
