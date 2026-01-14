"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 
    "1097843415098-ld0g5r4in2acqiom02rghkt5juj5poht.apps.googleusercontent.com";

  if (!clientId) {
    console.error("Google Client ID is missing. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID in your environment variables.");
    return <>{children}</>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}
