import "./globals.css";
import { ThemeProvider } from "../app/dark-light-toggle/providers";

export const metadata = {
  title: "Theme Toggle",
  description: "Dark Light Mode using next-themes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
