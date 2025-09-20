import "./globals.css";
import { AuthProvider } from "../context/Authcontext";
import { ThemeProvider } from "../context/Themecontext";

export default function RootLayout({ children }) {
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
