import "./globals.css";
import { AuthProvider } from "../context/Authcontext";
import { ThemeProvider } from "../context/Themecontext";
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
