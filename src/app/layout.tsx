import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/base/NavBar/component";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <main className="h-screen w-screen">
            <Navbar />
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
