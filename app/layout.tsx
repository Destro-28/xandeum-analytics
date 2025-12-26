// app/layout.tsx
import "./globals.css";
import { Navbar } from "./components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-slate-100 antialiased">
        <Navbar />
        <main className="pt-20 relative z-10">{children}</main>
      </body>
    </html>
  );
}
