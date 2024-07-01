import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <main className="h-screen w-screen">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
